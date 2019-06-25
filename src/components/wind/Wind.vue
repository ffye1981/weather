<template>
  <el-button @click="getNextData">默认按钮</el-button>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'Wind',
        data() {
            return {
              windData:[],
              velocityLayer: null,
              heatCfg: {
                // radius should be small ONLY if scaleRadius is true (or small radius is intended)
                // if scaleRadius is false it will be the constant radius used in pixels
                "radius": 2,
                "maxOpacity": .8,
                // scales the radius based on map zoom
                "scaleRadius": true,
                // if set to false the heatmap uses the global maximum for colorization
                // if activated: uses the data maximum within the current map boundaries
                //   (there will always be a red spot with useLocalExtremas true)
                "useLocalExtrema": true,
                // which field name in your data represents the latitude - default "lat"
                latField: 'lats',
                // which field name in your data represents the longitude - default "lng"
                lngField: 'lons',
                // which field name in your data represents the data value - default "value"
                valueField: 'speed'
              },
              heatLayer: null,
              lyrGroup: L.layerGroup([])
            }
        },
        props: {},
        computed: {
          ...mapState({
            playTime: state => state.timeSlider.playTime,
            loadMapSuccess: state => state.map.loadMapSuccess
          }),
        },
        watch: {
          playTime: function (newVal, preVal) {
              console.log('playTime改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              var hour = new Date(Date.parse(newVal.replace(/-/g, "/"))).getHours();
              if(this.velocityLayer) {
                this.getData(hour)
              }
          },
          loadMapSuccess: function (newVal, preVal) {
              // console.log('loadMapSuccess改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              if(newVal) {
                this.$Maps.addLayer(this.lyrGroup);
                // this.initLayer()
                this.getData(0)
              }
          },
          windData: function (newVal, preVal) {
              if(this.velocityLayer) {
                 this.velocityLayer.setData(newVal)
                 this.heatLayer.setGribData(newVal)
              }else {
                this.initLayer()
              }
              //this.drawPoint();
          }
        },
        created() {
            // console.log('component created')
        },
        mounted() {
            // console.log('component mounted')
            // this.getData()
        },
        methods: {
            initLayer() {
              this.heatLayer = new HeatmapOverlay(this.heatCfg);
              this.heatLayer.addTo(this.$Maps);
              this.heatLayer.setGribData(this.windData);
              this.velocityLayer = L.velocityLayer({
                  displayValues: true,
                  displayOptions: {
                    velocityType: 'Global Wind',
                    displayPosition: 'bottomleft',
                    displayEmptyString: 'No wind data'
                  },
                  data: this.windData,
                  maxVelocity: 30,
                  colorScale: [
                    "rgb(255,255,255)"
                  ]
                });
              this.velocityLayer.addTo(this.$Maps);
            },
            getData(hour) {
                // var bounds = this.$Maps.getBounds();
                // var polygon = Terraformer.WKT.convert({
                //   "type": "Polygon",
                //   "coordinates": [
                //     [ [bounds._northEast.lng, bounds._northEast.lat],
                //       [bounds._northEast.lng, bounds._southWest.lat],
                //       [bounds._southWest.lng, bounds._southWest.lat],
                //       [bounds._southWest.lng, bounds._northEast.lat],
                //       [bounds._northEast.lng, bounds._northEast.lat] ]
                //   ]
                // });
              debugger
                var that = this
                this.$http.getData('static/data/gfs.t00z.pgrb2.1p00.f'+hour+'.json',{time: this.playTime}, {}, function (data, msg) {
                  //this.$http.getData(config.services.baseUrl + config.services.wind.windData, {time: this.playTime,wkt:polygon}, {}, function (data, msg) {
                    that.windData = data;
                })
            },
            getNextData() {
              var bounds = this.$Maps.getBounds();
              var polygon = Terraformer.WKT.convert({
                "type": "Polygon",
                "coordinates": [
                  [ [bounds._northEast.lng, bounds._northEast.lat],
                    [bounds._northEast.lng, bounds._southWest.lat],
                    [bounds._southWest.lng, bounds._southWest.lat],
                    [bounds._southWest.lng, bounds._northEast.lat],
                    [bounds._northEast.lng, bounds._northEast.lat] ]
                ]
              });
              var that = this
              this.$http.getData('static/data/gfs.t00z.pgrb2.1p00.f2.json',{time: this.playTime,wkt:polygon}, {}, function (data, msg) {
                //this.$http.getData(config.services.baseUrl + config.services.wind.windData, {time: this.playTime,wkt:polygon}, {}, function (data, msg) {
                that.windData = data;
              })
            },
            getHeatData() {
              var that = this
              this.$http.getData(config.services.baseUrl + config.services.wind.windData, {time: this.playTime}, {}, function (data, msg) {
                that.heatLayer.setData({
                    max: 27.24,
                    data: data
                });
              })
            },
            drawPoint() {
              var that = this
              function drawcircle(latlng,dir,speed){
                ///自定义一个maker
                const greenIcon = L.icon({
                  iconUrl: 'static/images/Gps_Device_16.png',
                  iconSize: [16,16], // size of the icon
                  popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
                });

                const oMarker = L.circle(latlng, {radius: 200});
                // 绑定一个提示标签
                oMarker.bindTooltip('<p>'+dir+ ','+speed+'</p>', { direction: 'left', offset: [0, 0] });
                that.lyrGroup.addLayer(oMarker);
              }
              this.lyrGroup.clearLayers();
              for(var i=0;i<this.windData.length;i++){
                drawcircle([this.windData[i].lats,this.windData[i].lons],this.windData[i].direction,this.windData[i].speed);
              }
            }
        },
        destroyed: function () {
          this.velocityLayer._destroyWind()
        },
        components: {}
    }
</script>

<style scoped>

</style>
