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
      // console.log('改变之前的值：' + preVal + '；改变之后的值：' + newVal)
    }
  },
  created() {
    // console.log('component created')
  },
  mounted() {
    // console.log('component mounted')
    this.initMap()
  },
  methods: {
    getList() {},
    initMap() {

      var that = this;
      this.map = L.map("map").setView(config.mapConfig.view.center, config.mapConfig.view.zoom);
      var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map);
      // // device orient
      // L.TiltHandler = L.Handler.extend({
      //     addHooks: function() {
      //         L.DomEvent.on(window, 'deviceorientation', this._tilt, this);
      //     },

      //     removeHooks: function() {
      //         L.DomEvent.off(window, 'deviceorientation', this._tilt, this);
      //     },

      //     _tilt: function(ev) {
      //         // Treat Gamma angle as horizontal pan (1 degree = 1 pixel) and Beta angle as vertical pan
      //         this._map.panBy( L.point( ev.gamma, ev.beta ) );
      //     }
      // });

      // L.CustomHandler = L.Handler.extend({
      //   addHooks: function(){
      //     L.DomEvent.on(document, "eventname", this._doSomething, this);
      //   }, 
      //   removeHooks: function(){
      //     L.DomEvent.off(document, "eventname", this._doSomething, this);
      //   },
      //   _doSomething: function(event){
      //     console.log("_doSomething", event)
      //   }
      // })

      // L.TiltHandler = L.Handler.extend({
      //   addHooks: function(){
      //     L.DomEvent.on(window, "deviceorientation", this._tilt, this);
      //   },
      //   removeHooks: function(){
      //     L.DomEvent.off(window, "deviceorientation", this._tilt, this);
      //   },
      //   _tilt: function(ev){
      //     this._map.panBy(L.point(ev.gamma, ev.beta));
      //   }
      // })
      // L.Map.addInitHook("addHandler", "tilt", L.TiltHandler);
      // var map = L.map("mapDiv", {tilt: true})

      // add watermark
      L.Control.Watermark = L.Control.extend({
        onAdd: function(map){
          var img = L.DomUtil.create("img");
          img.src = require('../../assets/logo.png');
          img.style.width = "200px";
          return img;
        },
      });
      L.control.watermark = function(opts){
        return new L.Control.Watermark(opts);
      }
      L.control.watermark({position: "bottomleft"}).addTo(this.map);

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
