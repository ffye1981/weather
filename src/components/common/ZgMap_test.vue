<template>
  <div id="map"></div>
</template>

<script>
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
    this.getDataList()
    this.initMap()
  },
  methods: {
    getList() {},
    getDataList() {
      $http.getData(
        'https://leafletjs.com/examples/choropleth/us-states.js',
        response => {
          console.log('data_return', response)
        }
      )
      // .then(function (response) {
      //     console.log(response);
      // })
      // .catch(function (error) {
      //     console.log(error);
      // });
    },
    initMap() {
      let that = this
      this.map = L.map('map').setView(
        config.mapConfig.view.center,
        config.mapConfig.view.zoom
      )
      var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map)

      function getColor(d) {
        return d > 1000
          ? '#800026'
          : d > 500
          ? '#BD0026'
          : d > 200
          ? '#E31A1C'
          : d > 100
          ? '#FC4E2A'
          : d > 50
          ? '#FD8D3C'
          : d > 20
          ? '#FEB24C'
          : d > 10
          ? '#FED976'
          : '#FFEDA0'
      }

      function style(feature) {
        return {
          fillColor: getColor(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        }
      }
      var statesData = null //请求接口拿到的

      L.geoJson(statesData, { style: style }).addTo(this.map)

      // L.geoJSON(someFeatures, {
      //     filter: function(feature, layer) {
      //         return feature.properties.show_on_map;
      //     }
      // }).addTo(this.map);
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
.leaflet-marker-pane >>> .my_div_icon {
  width: 300;
  height: 300;
  background: 'red';
}
</style>
