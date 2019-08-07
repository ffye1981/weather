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
      this.map = L.map('map').setView(config.mapConfig.view.center,config.mapConfig.view.zoom);
      var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map);
      // var marker = L.marker([39.966493,116.332979]).addTo(this.map);

      var bounds = L.latLngBounds([[ 35, 108], [ 39, 117]]);
      L.rectangle(bounds).addTo(this.map);
      this.map.fitBounds(bounds);

      var videoUrls = [
        'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
        'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
      ];

      // var bounds = L.latLngBounds([[ 35, 108], [ 39, 117]]);
      var videoOverlay = L.videoOverlay(videoUrls, bounds, {
          opacity: 0.9
      }).addTo(this.map);
      console.log("videoOverlay", videoOverlay)
      videoOverlay.on('load', function () {
        console.log("videoOverlay__load", L)
        var MyPauseControl = L.Control.extend({
            onAdd: function() {
                var button = L.DomUtil.create('button');
                button.innerHTML = '⏸';
                L.DomEvent.on(button, 'click', function () {
                    videoOverlay.getElement().pause();
                });
                // console.log("test_pause", button);
                return button;
            }
        });
        var MyPlayControl = L.Control.extend({
            onAdd: function() {
                var button = L.DomUtil.create('button');
                button.innerHTML = '⏵';
                L.DomEvent.on(button, 'click', function () {
                    videoOverlay.getElement().play();
                });
                // console.log("test_play", button);
                return button;
            }
        });
        console.log("MyPauseControl", new MyPauseControl())
        console.log("MyPlayControl", new MyPlayControl())
        var pauseControl = (new MyPauseControl()).addTo(that.map);
        var playControl = (new MyPlayControl()).addTo(that.map);
    })

      

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
