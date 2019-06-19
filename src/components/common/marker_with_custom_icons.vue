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
                let that = this;
                this.map = L.map('map').setView(config.mapConfig.view.center,config.mapConfig.view.zoom);   
                var layer = L.tileLayer(config.mapConfig.baseLayer.url).addTo(this.map);
                var greenIcon = L.icon({
                    // iconUrl: "../../assets/newIcon/locationGreen.png",
                    iconUrl: require("../../assets/newIcon/locationGreen.png"),      // webpack打包项目中，图片显示问题
                    shadowUrl: require("../../assets/newIcon/locationGrey.png"),
                    iconSize:     [38, 95], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                L.marker([39.966493,116.332979], {icon: greenIcon}).bindPopup('绿色是森林').addTo(this.map);
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
    .leaflet-marker-pane>>>.my_div_icon {
        width: 300;
        height: 300;
        background: "red"
    }
</style>
