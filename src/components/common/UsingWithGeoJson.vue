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
                // var marker = L.marker([39.966493,116.332979]).addTo(this.map);
                // var geojsonFeature = {
                //     "type": "Feature",
                //     "properties": {
                //         "name": "Coors Field",
                //         "amenity": "Baseball Stadium",
                //         "popupContent": "This is where the Rockies play!"
                //     },
                //     "geometry": {
                //         "type": "Point",
                //         "coordinates": [116, 39],
                //     }
                // };
                // L.geoJSON(geojsonFeature).addTo(this.map);

                // 交互处理
                // var onEachFeature = (feature, layer) => {
                //     // does this feature have a property named popupContent?
                //     if (feature.properties && feature.properties.popupContent) {
                //         layer.bindPopup(feature.properties.popupContent);
                //     }
                // };
                // var geojsonFeature = {
                //     "type": "Feature",
                //     "properties": {
                //         "name": "Coors Field",
                //         "amenity": "Baseball Stadium",
                //         "popupContent": "This is where the Rockies play!"
                //     },
                //     "geometry": {
                //         "type": "Point",
                //         "coordinates": [116.332979 ,39.966493,]
                //     }
                // };
                // L.geoJSON(geojsonFeature, {
                //     onEachFeature: onEachFeature
                // }).addTo(this.map);

                // var myLines = [{
                //     "type": "LineString",
                //     "coordinates": [[105,30], [110,35], [120,40]]
                // }, {
                //     "type": "LineString",
                //     "coordinates": [[105,35], [110,40,], [120,45, ]]
                // }];
                // var myStyle = {
                //     "color": "#ff7800",
                //     "weight": 5,
                //     "opacity": 0.65
                // };
                // L.geoJSON(myLines, {
                //     style: myStyle
                // }).addTo(this.map);
            
                // var states = [{
                //     "type": "Feature",
                //     "properties": {"party": "Republican"},
                //     "geometry": {
                //         "type": "Polygon",
                //         "coordinates": [[
                //                 [-104.05, 48.99],
                //                 [-97.22,  48.98],
                //                 [-96.58,  45.94],
                //                 [-104.03, 45.94],
                //                 [-104.05, 48.99]
                //         ]]
                //     }
                // }, {
                //     "type": "Feature",
                //     "properties": {"party": "Democrat"},
                //     "geometry": {
                //         "type": "Polygon",
                //         "coordinates": [[
                //             [-109.05, 41.00],
                //             [-102.06, 40.99],
                //             [-102.03, 36.99],
                //             [-109.04, 36.99],
                //             [-109.05, 41.00]
                //         ]]
                //     }
                // }];
                // L.geoJSON(states, {
                //     style: function(feature) {
                //         switch (feature.properties.party) {
                //             case 'Republican': return {color: "#ff0000"};
                //             case 'Democrat':   return {color: "#0000ff"};
                //         }
                //     }
                // }).addTo(this.map);

                // using the pointToLayer option to create a CircleMarker
                // var someGeojsonFeature = {
                //     "type": "Feature",
                //     "properties": {
                //         "name": "Coors Field",
                //         "amenity": "Baseball Stadium",
                //         "popupContent": "This is where the Rockies play!"
                //     },
                //     "geometry": {
                //         "type": "Point",
                //         "coordinates": [116.332979, 39.966493,]
                //     }
                // };
                // var geojsonMarkerOptions = {
                //     radius: 18,
                //     fillColor: "#ff7800",
                //     color: "#000",
                //     weight: 1,
                //     opacity: 1,
                //     fillOpacity: 0.8
                // };
                // L.geoJSON(someGeojsonFeature, {
                //     pointToLayer: function (feature, latlng) {
                //         return L.circleMarker(latlng, geojsonMarkerOptions);
                //     }
                // }).addTo(this.map);

                var someFeatures = [{
                    "type": "Feature",
                    "properties": {
                        "name": "Coors Field",
                        "show_on_map": true
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-104.99404, 39.75621]
                    }
                }, {
                    "type": "Feature",
                    "properties": {
                        "name": "Busch Field",
                        "show_on_map": false   // true
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-104.98404, 39.74621]
                    }
                }];
                L.geoJSON(someFeatures, {
                    filter: function(feature, layer) {
                        return feature.properties.show_on_map;
                    }
                }).addTo(this.map);
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
    .leaflet-marker-pane>>>.my_div_icon {
        width: 300;
        height: 300;
        background: "red"
    }
</style>
