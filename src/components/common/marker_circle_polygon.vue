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
            field: function (preVal, newVal) {
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
            getList() {
            },
            initMap(){
                // console.log(config.mapConfig.view.center)
                var that = this;
                this.map = L.map('map').setView(config.mapConfig.view.center,config.mapConfig.view.zoom);
                var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map);
                layer.on('load', function (e) {
                  that.$store.dispatch('actionMapState', true)
                });
                var marker = L.marker([39.966493,116.332979]).addTo(this.map);
                var circle = L.circle([39.966493,116.332979], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 10000
                }).addTo(this.map);

                var polygon = L.polygon([
                    [39.9,116.3],
                    [38.99,116.39],
                    [36.95,113.35]
                ]).addTo(this.map);

                // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
                // circle.bindPopup("I am a circle.");
                // polygon.bindPopup("I am a polygon.");
                let popup = L.popup();
                let onMapClick = e => {
                    popup.setLatLng(e.latlng).
                    setContent("You click the map at" + e.latlng.toString())
                    .openOn(this.map);
                }
                this.map.on('click', onMapClick);
                // var popup = L.popup()
                //     .setLatLng([39,116])
                //     .setContent("I am a standalone popup.")
                //     .openOn(this.map);



                },
        },
        destroyed: function () {
        },
        components: {}
    }
</script>

<style scoped>
  body { margin:0; padding:0; }
  #map { position: absolute; top:0; bottom:0; right:0; left:0; z-index: -1}
</style>
