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
                let that = this;
                this.map = L.map('map').setView(config.mapConfig.view.center,config.mapConfig.view.zoom);   
                // this.map = L.map("map");             
                this.map.locate({setView: true, maxZoom: 8});
                let layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map);

                let onLocationFound = (e) => {
                    let radius = e.accuracy / 2; 
                    L.marker(e.latlng).addTo(this.map)
                    .bindPopup("You are within" + radius + "meters from this point").openPopup();
                    L.circle(e.latlng, radius).addTo(this.map);
                }
                this.map.on('locationfound', onLocationFound);

                let onLocationError = (e) => {
                    alert(e.message);
                }
                this.map.on("locationError", onLocationError)

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
