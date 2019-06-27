<template>
  <div id="map"></div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'ZgMap',
  data() {
    return {
      map: null
    }
  },
  props: {},
  computed: {},
  watch: {
    field: function(preVal, newVal) {
      console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
    }
  },
  created() {
    console.log('component created')
  },
  mounted() {
    console.log('component mounted')
    this.initMap()
  },
  methods: {
    getList() {},
    initMap() {

      var that = this;
      this.map = L.map("map").setView(config.mapConfig.view.center, config.mapConfig.view.zoom);

      // L.TileLayer.kitten = L.TileLayer.extend({
      //   getTileUrl: function(coords){
      //     var i = Math.ceil(Math.random() * 4);
      //     return "https://placekitten.com/256/256?image=" + i
      //   },
      //   getAttribution: function(){
      //     return "<a href='https:/placekitten.com/attribution.html'>PlaceKitten</a>"
      //   }
      // });
      // L.tileLayer.kitten = function(){
      //   return new L.TileLayer.kitten();
      // };
      // L.tileLayer.kitten().addTo(this.map);

      // L.GridLayer.DebugCoords = L.GridLayer.extend({
      //   // createTile: function(coords){
      //   //   var tile = document.createElement("div");
      //   //   tile.innerHTML = [coords.x, coords.y, coords.z].join(", ");
      //   //   tile.style.outline = "1px solid red";
      //   //   return tile;
      //   // }
      //   createTile: function(coords, done){
      //     var tile = document.createElement("div");
      //     tile.innerHTML = [coords.x, coords.y, coords.z].join(", ");
      //     tile.style.outline = "1px solid blue";s
      //     setTimeout(function(){
      //       done(null, tile);  // Syntax is 'done(error, tile)'
      //     }, 500 + Math.random() * 1500)
      //     return tile;
      //   }

      // });
      // L.gridLayer.debugCoords = function(opts){
      //   return new L.GridLayer.DebugCoords(opts);
      // }
      // this.map.addLayer(L.gridLayer.debugCoords());

      // A very basic <canvas> GridLayer  text describe
      // L.GridLayer.CanvasCircles = L.GridLayer.extend({
      //   createTile: function(coords){
      //     var tile = document.createElement("canvas");
      //     var tileSize = this.getTileSize();
      //     tile.setAttribute("width", tileSize.x);
      //     tile.setAttribute("height", tileSize.y);
      //     var ctx = tile.getContext("2d");
      //     ctx.beginPath();
      //     ctx.arc(tileSize.x/2, tileSize.x/2, 4 + coords.z*4, 0, 2*Math.PI, false);
      //     ctx.fill();
      //     return tile;
      //   }
      // })
      // L.gridLayer.canvasCircles = function(opts){
      //   return new L.GridLayer.CanvasCircles(opts);
      // }
      // this.map.addLayer(L.gridLayer.canvasCircles());


      L.CustomLayer = L.Layer.extend({
        onAdd: function(map) {
            var pane = map.getPane(this.options.pane);
            this._container = L.DomUtil.create("button");
            pane.appendChild(this._container);
            // Calculate initial position of container with `L.Map.latLngToLayerPoint()`, `getPixelOrigin()` and/or `getPixelBounds()`
            L.DomUtil.setPosition(this._container, point);
            // Add and position children elements if needed
            map.on('zoomend viewreset', this._update, this);
        },
        onRemove: function(map) {
            L.DomUtil.remove(this._container);
            map.off('zoomend viewreset', this._update, this);
        },
        _update: function() {
            // Recalculate position of container
            L.DomUtil.setPosition(this._container, point);        
            // Add/remove/reposition children elements if needed
        }
      });

      L.Polyline.Red = L.Polyline.extend({
          onAdd: function(map) {
              this.options.color = 'red';
              L.Polyline.prototype.onAdd.call(this, map);
          }
      });
      
    }
  },
  destroyed: function() {},
  components: {}
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
</style>
