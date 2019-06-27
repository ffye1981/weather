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
            getList() {
            },
            initMap(){
                // console.log(config.mapConfig.view.center)
                var that = this
                // this.map = L.map('map').setView(config.mapConfig.view.center,config.mapConfig.view.zoom)
                // var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map)
                // var marker = L.marker([39.966493,116.332979]).addTo(this.map);
                // var circle = L.circle([39.966493,116.332979], {
                //     color: 'red',
                //     fillColor: '#f03',
                //     fillOpacity: 0.5,
                //     radius: 10000
                // // }).addTo(this.map);
               
                // this.map = L.map('map', {
                //     center: config.mapConfig.view.center,
                //     zoom: 10,
                //     // layers: [grayscale, cities]
                // });

                let littletom = L.marker([39.61, 115.02]).bindPopup("This is Littleton, CO.");
                let denver = L.marker([39.74, 114.99]).bindPopup("This is Denver, CO.");
                let aurora = L.marker([39.73, 114.8]).bindPopup("This is Aurora, CO.");
                let golden = L.marker([39.77, 115.23]).bindPopup("This is Golden, CO.");

                let cities = L.layerGroup([littletom, denver, aurora, golden]);
                var grayscale = L.tileLayer(config.mapConfig.baseLayer.url, {id: 'MapID'});
                var streets   = L.tileLayer(config.mapConfig.baseLayer.url, {id: 'MapID'});

                this.map = L.map('map', {
                    center: config.mapConfig.view.center,
                    zoom: 10,
                    layers: [grayscale, cities]       // 作用：初始化时有底图显示
                });              
                // var baseMaps = {
                //     "Grayscale": grayscale,
                //     "Streets": streets
                // };
                var baseMaps = {
                    "<span style='color: gray'>Grayscale</span>": grayscale,
                    "Streets": streets
                };

                var overlayMaps = {
                    "Cities": cities
                };
                L.control.layers(baseMaps, overlayMaps).addTo(this.map);
            }
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
