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

        var map = L.map('map');
        map.createPane('labels');
        map.getPane('labels').style.zIndex = 650;
        map.getPane('labels').style.pointerEvents = 'none';

        var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
        }).addTo(map);

        var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
                attribution: '©OpenStreetMap, ©CartoDB',
                pane: 'labels'
        }).addTo(map);

        function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.popupContent) {
                layer.bindPopup(feature.properties.popupContent);
            }
        }

        var geojsonFeature = {
            "type": "Feature",
            "properties": {
                "name": "Coors Field",
                "amenity": "Baseball Stadium",
                "popupContent": "This is where the Rockies play!"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-104.99404, 39.75621]
            }
        };

        var geojson = L.geoJson(geojsonFeature, {
            onEachFeature: onEachFeature
        }).addTo(map);
        geojson.eachLayer(function (layer) {
            layer.bindPopup(layer.feature.properties.name);
        });

        map.fitBounds(geojson.getBounds());

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
