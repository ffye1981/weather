<template>
  <!--<el-button @click="getNextData">默认按钮</el-button>-->
   <canvas ref="legendCanvas" width="30" height="130" style="display: none"></canvas>
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
                "maxOpacity": .5,
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
                valueField: 'speed',
                gradient: {
                  // enter n keys between 0 and 1 here
                  // for gradient color customization
                  .25: '#00192E',
                  .50: 'green',
                  .75: 'yellow',
                  1: 'red'
                },
                onExtremaChange: function(data) {
                  // console.log('onExtremaChange' + data)
                  this.updateLegend(data);
                }.bind(this)
              },
              heatLayer: null,
              lyrGroup: L.layerGroup([]),
              _shakeTimer: 0
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
                  this.heatLayer.setGribData(this.windData);
              }else {
                  this.initLayer()
              }
              // this.drawPoint();
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
              var that = this
              this.velocityLayer = L.velocityLayer({
                  displayValues: true,
                  displayOptions: {
                    velocityType: '全球风场',
                    displayPosition: 'bottomleft',
                    emptyString: '全球风场'
                  },
                  data: this.windData,
                  maxVelocity: 30,
                  colorScale: [
                    "rgb(255,255,255)"
                  ],
                  onMouseMove: function(angle,speed,unit,postion) {
                      // console.log('wind=top:'+ postion.y + '°,left:'+ postion.x)
                      //更新鼠标提示窗口
                      that.shakeTimer = setTimeout(function(){
                        that.$store.dispatch('ACTION_WEATHER_TIP', {
                          text: speed + ' ' + unit,
                          top: postion.y,
                          left: postion.x
                        })
                      }, 200);

                  }
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
                var that = this
                this.$http.getData('static/data/gfs.t00z.pgrb2.1p00.f'+hour+'.json',{time: this.playTime}, {}, function (data, msg) {
                  //this.$http.getData(config.services.baseUrl + config.services.wind.windData, {time: this.playTime,wkt:polygon}, {}, function (data, msg) {
                    that.windData = data
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
                // that.windData = data;
              })
            },
            getHeatData() {
              var that = this
              this.$http.getData(config.services.baseUrl + config.services.wind.windData, {time: this.playTime}, {}, function (data, msg) {
                that.heatLayer.setData({
                    max: 27.24,
                    data: this.windData
                });
              })
            },
            drawPoint() {
              var that = this
              function drawcircle(latlng,speed){
                ///自定义一个maker
                const greenIcon = L.icon({
                  iconUrl: 'static/images/Gps_Device_16.png',
                  iconSize: [16,16], // size of the icon
                  popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
                });

                const oMarker = L.circle(latlng, {radius: 5000});
                // 绑定一个提示标签
                oMarker.bindTooltip('<p>'+speed+'</p>', { direction: 'left', offset: [0, 0] });
                that.lyrGroup.addLayer(oMarker);
              }
              this.lyrGroup.clearLayers();
              for(var i=0;i<this.windData.length;i++){
                drawcircle([this.windData[i].lats,this.windData[i].lons],this.windData[i].speed);
              }
            },
            updateLegend: function (data) {
              // the onExtremaChange callback gives us min, max, and the gradientConfig
              // so we can update the legend
              // this.$refs.min.innerHTML = data.min
              // this.$refs.max.innerHTML = data.max
              var legendCtx = this.$refs.legendCanvas.getContext('2d')
              var gradientCfg = data.gradient
              var gradient = legendCtx.createLinearGradient(0, 130, 0, 0)
              for (var key in gradientCfg) {
                gradient.addColorStop(key, gradientCfg[key])
              }
              legendCtx.fillStyle = gradient
              legendCtx.fillRect(0, 0, 30, 130)
              // this.$refs.gradient.src = this.$refs.legendCanvas.toDataURL()
              this.$store.dispatch('ACTION_WEATHER_LEGEND', {
                src: this.$refs.legendCanvas.toDataURL(),
                max: data.max.toFixed(1),       //最大值
                min: data.min.toFixed(1),       //最小值
                unit: 'm/s'      //单位
              })
            }
        },
        // beforeUpdate: function(){
        //   if(this.velocityLayer) {
        //       this.velocityLayer.setData(newVal)
        //       this.heatLayer.setGribData(this.windData);
        //   }else {
        //       this.initLayer()
        //   }
        // },
        // updated: function(){
        //   if(this.velocityLayer) {
        //       this.velocityLayer.setData(newVal)
        //       this.heatLayer.setGribData(this.windData);
        //   }else {
        //       this.initLayer()
        //   }
        // },
        destroyed: function () {
          // this.velocityLayer._destroyWind()
        },
        components: {}
    }
</script>

<style scoped>
  .legend-area {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    background: white;
    outline: 3px solid black;
    line-height: 1em;
  }
</style>
