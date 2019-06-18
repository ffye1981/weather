L.VelocityLayer = (L.Layer ? L.Layer : L.Class).extend({
	options: {
		displayValues: true,
		displayOptions: {
			velocityType: 'Velocity',
			position: 'bottomleft',
			emptyString: 'No velocity data'
		},
		maxVelocity: 10, // used to align color scale
		colorScale: null,
		bounds: null,
    sampleCnt: 500
	},

	_map: null,
	_canvasLayer: null,
	_windy: null,
	_context: null,
	_mouseControl: null,
	_windData: null,
  _shakeTimer: null,

	initialize: function(options) {
	    // console.log('VelocityLayer initialize....')
		L.setOptions(this, options);
	},

	onAdd: function(map) {
	    // console.log('VelocityLayer onAdd....')
		// create canvas, add overlay control
		this._canvasLayer = L.canvasLayer().delegate(this);
		this._canvasLayer.addTo(map);
		this._map = map;
    this._initWindy(this);
    this._startWindy();
	},

	onRemove: function(map) {
	    // console.log('VelocityLayer onRemove....')
		this._destroyWind();
	},

	setData: function setData(windData) {
	      this.options.data = windData;
        this._clearWind();
        this._startWindyShake();
	},

	/*------------------------------------ PRIVATE ------------------------------------------*/
  _startWindyShake: function(overlay, params) {
	    // console.log('VelocityLayer onDrawLayer....')
    // 防止多次执行
    clearTimeout(this._shakeTimer);
		var that = this;
    this._shakeTimer = setTimeout(function(){
      that._startWindy();
    }, 700);

	},
  reDrawLayer: function(){
      this._destroyWind();
      this.onAdd(this._map);
      this._initWindy(this);
  },
	_startWindy: function() {
    // console.log('VelocityLayer _startWindy....' + new Date().getTime())
		var bounds = this._getBounds();
		var _min = [bounds._southWest.lat, bounds._southWest.lng];
        var _max = [bounds._northEast.lat, bounds._northEast.lng];
        var min = this._map.latLngToContainerPoint(_min);
        var max = this._map.latLngToContainerPoint(_max);
        var extent = [
            [min.x, max.y],
            [max.x, min.y]
        ];
        this._invertData();
        this._windy.start(extent, this._windData);
	},

	_initWindy: function(self) {
		// windy object, copy options
		const options = Object.assign({ canvas: self._canvasLayer._canvas }, self.options);
		this._windy = new Windy(options);

		// prepare context global var, start drawing
		this._context = this._canvasLayer._canvas.getContext('2d');
		this._canvasLayer._canvas.classList.add("velocity-overlay");

		this._map.on('dragstart', self._clearWind.bind(self));
    this._map.on('dragend', self._startWindyShake.bind(self));
    this._map.on('zoomstart', self._clearWind.bind(self));
    this._map.on('zoomend', self._startWindyShake.bind(self));
    //this._map.on('resize', self._clearAndRestart);
		this._initMouseHandler();
	},

	_initMouseHandler: function() {
		if (!this._mouseControl && this.options.displayValues) {
			var options = this.options.displayOptions || {};
			options['leafletVelocity'] = this;
			this._mouseControl = L.control.velocity(options).addTo(this._map);
		}
	},

	_clearAndRestart: function(){
		if (this._context) this._context.clearRect(0, 0, 3000, 3000);
		if (this._windy) this._startWindy();
	},

	_clearWind: function() {
		if (this._windy) this._windy.stop();
		if (this._context) this._context.clearRect(0, 0, 3000, 3000);
	},

	_destroyWind: function() {
		if (this._windy) this._windy.stop();
		if (this._context) this._context.clearRect(0, 0, 3000, 3000);
		if (this._mouseControl) this._map.removeControl(this._mouseControl);
		this._mouseControl = null;
		this._windy = null;
		this._map.removeLayer(this._canvasLayer);
	},
	_invertData: function setData() {
        var start = new Date().getTime();
        this._windData = [];
        if(this.options.data) {
          var that = this;
          //采样
          var rate = this.options.sampleCnt <= 1? 1: this.options.data.length/this.options.sampleCnt
          rate = rate< 1?1:rate;
          var length = Math.min(this.options.sampleCnt,this.options.data.length)
          for(var i=0;i<length;i++) {
            var wd = this.options.data[Math.round(i*rate)]
            var px = that._map.latLngToContainerPoint([wd.lats, wd.lons]);
            var x = px.x;
            var y = px.y;
            var angle = wd.direction;
            var speed = wd.speed;
            that._windData.push({
              x,y,angle,speed
            })
          }
        }
        console.log('VelocityLayer _invertData....' + (new Date().getTime() - start));
        // if(this.options.data) {
        //     var that = this;
        //     this.options.data.forEach(function (wd) {
        //         var px = that._map.latLngToContainerPoint([wd.lats, wd.lons]);
        //         var x = px.x;
        //         var y = px.y;
        //         var angle = wd.direction;
        //         var speed = wd.speed;
        //         that._windData.push({
        //             x,y,angle,speed
        //         });
        //     });
        // }
    },
    _getBounds: function() {
        return this.options.bounds || this._map.getBounds();
    }
});

L.velocityLayer = function(options) {
	return new L.VelocityLayer(options);
};
