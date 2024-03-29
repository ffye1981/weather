/*
* Leaflet Heatmap Overlay
*
* Copyright (c) 2008-2016, Patrick Wied (https://www.patrick-wied.at)
* Dual-licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and the Beerware (http://en.wikipedia.org/wiki/Beerware) license.
*/
;(function (name, context, factory) {
  // Supports UMD. AMD, CommonJS/Node.js and browser context
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(
      require('heatmap.js'),
      require('leaflet')
    );
  } else if (typeof define === "function" && define.amd) {
    define(['heatmap.js', 'leaflet'], factory);
  } else {
    // browser globals
    if (typeof window.h337 === 'undefined') {
      throw new Error('heatmap.js must be loaded before the leaflet heatmap plugin');
    }
    if (typeof window.L === 'undefined') {
      throw new Error('Leaflet must be loaded before the leaflet heatmap plugin');
    }
    context[name] = factory(window.h337, window.L);
  }

})("HeatmapOverlay", this, function (h337, L) {
  'use strict';

  // Leaflet < 0.8 compatibility
  if (typeof L.Layer === 'undefined') {
    L.Layer = L.Class;
  }

  var HeatmapOverlay = L.Layer.extend({

    initialize: function (config) {
      this.cfg = config;
      this._el = L.DomUtil.create('div', 'leaflet-zoom-hide');
      this._data = [];
      this._max = 1;
      this._min = 0;
      this.cfg.container = this._el;
      this.lyrGroup = L.layerGroup([])
    },

    onAdd: function (map) {
      var size = map.getSize();

      this._map = map;

      this._width = size.x;
      this._height = size.y;

      this._el.style.width = size.x + 'px';
      this._el.style.height = size.y + 'px';
      this._el.style.position = 'absolute';

      this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));

      map.getPanes().overlayPane.appendChild(this._el);

      if (!this._heatmap) {
        this._heatmap = h337.create(this.cfg);
      } 

      // this resets the origin and redraws whenever
      // the zoom changed or the map has been moved
      map.on('moveend', this._reset, this);
      map.on('mousemove', this._onMouseMove, this);
      map.addLayer(this.lyrGroup);
      this._draw();
    },

    addTo: function (map) {
      map.addLayer(this);
      return this;
    },

    onRemove: function (map) {
      // remove layer's DOM elements and listeners
      map.getPanes().overlayPane.removeChild(this._el);
      map.off('moveend', this._reset, this);
      map.off('mousemove', this._onMouseMove, this);
    },
    _draw: function() {
      if (!this._map) { return; }
      
      var mapPane = this._map.getPanes().mapPane;
      var point = mapPane._leaflet_pos;      

      // reposition the layer
      this._el.style[HeatmapOverlay.CSS_TRANSFORM] = 'translate(' +
        -Math.round(point.x) + 'px,' +
        -Math.round(point.y) + 'px)';

      this._update();
    },
    _update: function() {
      var bounds, zoom, scale;
      var generatedData = { max: this._max, min: this._min, data: [] };

      bounds = this._map.getBounds();
      zoom = this._map.getZoom();
      scale = Math.pow(2, zoom);

      if (this._data.length == 0) {
        if (this._heatmap) {
          this._heatmap.setData(generatedData);
        }
        return;
      }


      var latLngPoints = [];
      var radiusMultiplier = this.cfg.scaleRadius ? scale : 1;
      var valueField = this.cfg.valueField;
      var len = this._data.length;
      var localMax = -10000000000;
      var localMin = 10000000000;
      // this.lyrGroup.clearLayers();
      while (len--) {
        var entry = this._data[len];
        var value = entry[valueField];
        var latlng = entry.latlng;


        // we don't wanna render points that are not even on the map ;-)
        if (!bounds.contains(latlng)) {
          continue;
        }
        // local max is the maximum within current bounds
        localMax = Math.max(value, localMax);
        localMin = Math.min(value, localMin);

        var point = this._map.latLngToContainerPoint(latlng);
        var latlngPoint = { x: Math.round(point.x), y: Math.round(point.y) };
        latlngPoint[valueField] = value;

        var radius;

        if (entry.radius) {
          radius = entry.radius * radiusMultiplier;
        } else {
          radius = (this.cfg.radius || 2) * radiusMultiplier;
        }
        latlngPoint.radius = radius;
        latLngPoints.push(latlngPoint);
        // this._drawPoint(latlng,value)
      }
      // if (this.cfg.useLocalExtrema) {
        this._max = generatedData.max = localMax;
        this._min = generatedData.min = localMin;
      // }
      generatedData.data = latLngPoints;
      if(generatedData.data.length > 0) {
        this._heatmap.setData(generatedData);
      }
    },
    setData: function(data) {
      this._max = data.max || this._max;
      this._min = data.min || this._min;
      var latField = this.cfg.latField || 'lat';
      var lngField = this.cfg.lngField || 'lng';
      var valueField = this.cfg.valueField || 'value';
    
      // transform data to latlngs
      var data = data.data;
      var len = data.length;
      var d = [];
    
      while (len--) {
        var entry = data[len];
        var latlng = new L.LatLng(entry[latField], entry[lngField]);
        var dataObj = { latlng: latlng };
        dataObj[valueField] = entry[valueField];
        if (entry.radius) {
          dataObj.radius = entry.radius;
        }
        d.push(dataObj);
      }
      this._data = d;
    
      this._draw();
    },
    setGribData: function(data){
      var valueField = this.cfg.valueField || 'value';
      var builder = this._createBuilder(data);
      var header = builder.header;
      var Δλ = header.lo2> header.lo1? header.dx: -header.dx;
      var Δφ = header.la2> header.la1? header.dy: -header.dy;    // distance between grid points (e.g., 2.5 deg lon, 2.5 deg lat)
      var d = [];
      var max = -10000000000,min = 10000000000,p = 0;
      var uvArr;
      for (var j = 0; j < header.ny; j++) {
        for (var i = 0; i < header.nx; i++, p++) {
          uvArr = builder.data(p);
          var speed = 0;
          var _onConverUnit = this.cfg.onConverUnit || this._onConverUnit;
          var value = _onConverUnit(uvArr, header.parameterUnit);
          max = Math.max(max,value);
          min = Math.min(min,value);
          var lon = header.lo1 + i * Δλ;
          var lat = header.la1 + j * Δφ;
          var latlng = new L.LatLng(lat, lon);
          var dataObj = { latlng: latlng };
          dataObj[valueField] = value;
          d.push(dataObj);
        }
      }
      this._max = max;
      this._min = min;
      this._data = d;
      this._draw();
    },
    getValueAt: function (post) {
      var value = this._heatmap.getValueAt(post);
      // if(this.cfg.useLocalExtrema) {
      //   return value;
      // }
      //10000000000 是_min的基准值，说明当前视窗范围无数据了。
      if(this._min != 10000000000) {
        value = (this._min + value).toFixed(1)
      }
      // console.log(value)
      return value;
    },
    addData: function(pointOrArray) {
      if (pointOrArray.length > 0) {
        var len = pointOrArray.length;
        while(len--) {
          this.addData(pointOrArray[len]);
        }
      } else {
        var latField = this.cfg.latField || 'lat';
        var lngField = this.cfg.lngField || 'lng';
        var valueField = this.cfg.valueField || 'value';
        var entry = pointOrArray;
        var latlng = new L.LatLng(entry[latField], entry[lngField]);
        var dataObj = { latlng: latlng };
        
        dataObj[valueField] = entry[valueField];
        this._max = Math.max(this._max, dataObj[valueField]);
        this._min = Math.min(this._min, dataObj[valueField]);

        if (entry.radius) {
          dataObj.radius = entry.radius;
        }
        this._data.push(dataObj);
        this._draw();
      }
    },
    _reset: function () {
      this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));
      
      var size = this._map.getSize();
      if (this._width !== size.x || this._height !== size.y) {
        this._width  = size.x;
        this._height = size.y;

        this._el.style.width = this._width + 'px';
        this._el.style.height = this._height + 'px';

        this._heatmap._renderer.setDimensions(this._width, this._height);
      }
      this._draw();
    },
    //解析grib数据
    _createWindBuilder: function(uComp, vComp) {
      var uData = uComp.data, vData = vComp.data;
      return {
        header: uComp.header,
        data: function(i) {
          return [uData[i], vData[i]];
        }
      }
    },
    _createOtherBuilder: function(comp) {
      return {
        header: comp.header,
        data: function(i) {
          return [comp.data[i]];
        }
      }
    },
    _createBuilder: function(data) {
      if(data instanceof Array){
        var uComp = null, vComp = null, scalar = null;
        data.forEach(function(record) {
          switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
            case "1,2":
            case "2,2":
              uComp = record;
              break;
            case "1,3":
            case "2,3":
              vComp = record;
              break;
            default:
              uComp = record;
          }
        });
        return this._createWindBuilder(uComp, vComp);
      }else {
        return this._createOtherBuilder(data);
      }

    },
    _onConverUnit: function(data, unit) {
      return data;
    },
    _onMouseMove: function (e) {
      if(this.cfg.onMouseMove) {
        this.cfg.onMouseMove(this.getValueAt(e.containerPoint),e.containerPoint);
      }
    },
    _drawPoint: function (latlng,value){
    // ///自定义一个maker
    // const greenIcon = L.icon({
    //   iconUrl: 'static/images/Gps_Device_16.png',
    //   iconSize: [16,16], // size of the icon
    //   popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
    // });

    const oMarker = L.circle(latlng, {radius: 5000});
    // 绑定一个提示标签
    oMarker.bindTooltip('<p>'+latlng+'</p>', { direction: 'left', offset: [0, 0] }).openTooltip();
    this.lyrGroup.addLayer(oMarker);
    }
  });

  HeatmapOverlay.CSS_TRANSFORM = (function() {
    var div = document.createElement('div');
    var props = [
      'transform',
      'WebkitTransform',
      'MozTransform',
      'OTransform',
      'msTransform'
    ];

    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      if (div.style[prop] !== undefined) {
        return prop;
      }
    }
    return props[0];
  })();

  return HeatmapOverlay;
});
