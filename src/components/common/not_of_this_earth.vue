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
      // console.log(config.mapConfig.view.center)
      var that = this
    //   this.map = L.map('map').setView(
    //     config.mapConfig.view.center,
    //     config.mapConfig.view.zoom
    //   )
    //   var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map)
      // layer.on('load', function (e) {
      //   that.$store.dispatch('ACTION_MAP_STATE', true)
      //   Vue.prototype.$Maps = that.map
      // })
        // var map = L.map('map', {
        //     crs: L.CRS.Simple
        // })
        var map = L.map('map', {
            crs: L.CRS.Simple,
            // minZoom: -12
        });
        var bounds = [[0,0], [1000,1000]];
        // var bounds = [[-26.5,-25], [1021.5,1023]];
        var image = L.imageOverlay(require('../../assets/newIcon/uqm_map_full.png'), bounds).addTo(map);
        map.fitBounds(bounds);
        
        // var sol = L.latLng([ 145, 175.2 ]);
        // L.marker(sol).addTo(map);
        map.setView( [70, 120], 1);

        var yx = L.latLng;
        var xy = function(x, y) {
            if (L.Util.isArray(x)) {    // When doing xy([x, y]);
                return yx(x[1], x[0]);
            }
            return yx(y, x);  // When doing xy(x, y);
        }

        var sol      = xy(175.2, 145.0);
        var mizar    = xy( 41.6, 130.1);
        var kruegerZ = xy( 13.4,  56.5);
        var deneb    = xy(218.7,   8.3);

        L.marker(     sol).addTo(map).bindPopup(      'Sol');
        L.marker(   mizar).addTo(map).bindPopup(    'Mizar');
        L.marker(kruegerZ).addTo(map).bindPopup('Krueger-Z');
        L.marker(   deneb).addTo(map).bindPopup(    'Deneb');

             // var travel = L.polyline([sol, deneb]).addTo(map);       // line
        var travel = L.polygon([sol, mizar, kruegerZ, deneb]).addTo(map);  // area
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
