<template>
  <!--<el-button @click="getData">默认按钮</el-button>-->
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'Wind',
        data() {
            return {
              // windData: [
              //   {lats:39.966493,lons:116.332979,direction:0,speed:0.8},
              //   {lats:39.961627,lons:116.749793, direction:90, speed:1.8728},
              //   {lats:40.556703,lons:115.687349, direction:180, speed:0.5754},
              //   {lats:40.668869,lons:117.72025, direction:270, speed:5.1799}
              // ],
              windData:[],
              velocityLayer: null,
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
              // console.log('playTime改变之前的值：' + preVal + '；改变之后的值：' + newVal)
          },
          loadMapSuccess: function (newVal, preVal) {
              // console.log('loadMapSuccess改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              if(newVal) {
                this.$Maps.addLayer(this.lyrGroup);
                this.initLayer()
                this.getData()
              }
          },
          windData: function (newVal, preVal) {
              if(this.velocityLayer) {
                 this.velocityLayer.setData(newVal)
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
                this.velocityLayer = L.velocityLayer({
                    displayValues: true,
                    displayOptions: {
                        velocityType: 'GBR Wind',
                        displayPosition: 'bottomleft',
                        displayEmptyString: 'No wind data'
                    },
                    // bounds: {
                    //     _northEast: {
                    //         lng: 118.078998,
                    //         lat: 40.854662
                    //     },
                    //     _southWest: {
                    //         lng: 115.209019,
                    //         lat: 39.221447
                    //     }
                    // },
                  data: this.windData,
                  lineStyle: 'rgba(255,255,255,0.8)',
                  lineWidth: 0.8,
                  frameRate: 1,
                  sampleCnt: 200
              });
              this.velocityLayer.addTo(this.$Maps);
            },
            getData() {
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
                this.$http.getData('static/data/response_1000.json',{time: this.playTime,wkt:polygon}, {}, function (data, msg) {
                  //this.$http.getData(config.services.baseUrl + config.services.wind.windData, {time: this.playTime,wkt:polygon}, {}, function (data, msg) {
                    that.windData = data;
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
