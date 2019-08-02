<template>
  <!--<el-button @click="getNextData">默认按钮</el-button>-->
  <div
    :class="showLoading ? 'loadingCss' :'noLoading'"
    >
   <canvas ref="legendCanvas" width="30" height="150" style="display: none"></canvas>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import weatherNameData from './constant/weatherNameData.js'

    export default {
        name: 'temperature',
        data() {
            return {
              showLoading: false,
              gribData: {},
              // gribWind: {},
              // velocityLayer: null,
              heatCfg: {
                "radius": 2,
                "maxOpacity": .5,
                "scaleRadius": true,
                "useLocalExtrema": false,
                latField: 'lats',
                lngField: 'lons',
                valueField: 'value',
                onConverUnit: function(data, unit){
                    if(unit.toLowerCase() == 'k') {
                      return data - 273.15;
                    }
                },
                onExtremaChange: function(data) {
                  this.updateLegend(data);
                }.bind(this)
              },
              heatLayer: null,
              _shakeTimer: 0
            }
        },
        props: {},
        computed: {
          ...mapState({
            playTime: state => state.timeSlider.playTime,
            loadMapSuccess: state => state.map.loadMapSuccess,
            weatherType: state => state.weatherSwitcher.weatherType, 
            weatherParams: state => state.weatherSwitcher.weatherParams,
          }),
        },
        watch: {
          playTime: function (newVal, preVal) {
              // console.log('playTime改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              var hour = new Date(Date.parse(newVal.replace(/-/g, "/"))).getHours();
              if(this.velocityLayer) {
                this.showLoading = true;
                this.getData(hour)
              }
          },
          weatherParams: function (newVal, preVal) {
              // console.log('weatherParams改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              var hour = new Date(Date.parse(this.playTime.replace(/-/g, "/"))).getHours();
              if(this.velocityLayer) {
                this.showLoading = true;
                this.getData(hour)
              }
          },
          loadMapSuccess: function (newVal, preVal) {
              // console.log('loadMapSuccess改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              if(newVal) {
                this.$Maps.addLayer(this.lyrGroup);
                this.getData(0)
              }
          },
          // gribWind: function (newVal, preVal) {
          //     if(this.velocityLayer) {
          //         this.velocityLayer.setData(newVal);
          //     }else {
          //         this.initWind();
          //     }
          // },
          gribData: function (newVal, preVal) {
            if(this.heatLayer) {
              this.heatLayer.setGribData(newVal);
            }else {
              this.initLayer();
            }
          }
        },
        created() {
            // console.log('component created')
        },
        mounted() {
            console.log('temperature- mounted' + this.weatherType)
            if(this.loadMapSuccess) {
               this.getData(0);
              //  this.getWindData(0);
            }
        },
        methods: {
            initLayer() {
              this.heatLayer = new HeatmapOverlay(this.heatCfg);
              this.heatLayer.addTo(this.$Maps);
              this.heatLayer.setGribData(this.gribData);
            },
            // initWind() {
            //   var that = this
            //   this.velocityLayer = L.velocityLayer({
            //     displayValues: true,
            //     displayOptions: {
            //       velocityType: '全球风场',
            //       displayPosition: 'bottomleft',
            //       emptyString: '全球风场'
            //     },
            //     data: this.gribWind,
            //     maxVelocity: 0,
            //     colorScale: [
            //       "rgb(255,255,255)"
            //     ]
            //   });
            //   this.velocityLayer.addTo(this.$Maps);
            // },
            getData(hour) {
                var that = this;
                // console.log(weatherNameData[this.weatherType], this.playTime, this.weatherParams.atmosphere);
                this.$http.getData(config.services.baseUrl + weatherNameData[1] + "/findOneGrib", {refTime: this.playTime, surfaceValue: parseInt(this.weatherParams.atmosphere) * 100}, {}, function (data, msg) {
                  //  console.log("findOneGrib", data);
                  that.showLoading = false;
                  that.gribData = data
                })
            },
            // getWindData(hour) {
            //   var that = this;
            //   // console.log(weatherNameData[this.weatherType], this.playTime, this.weatherParams.atmosphere);
            //   this.$http.getData(config.services.baseUrl + weatherNameData[0] + "/findOneGrib", {refTime: this.playTime, surfaceValue: parseInt(this.weatherParams.atmosphere) * 100}, {}, function (data, msg) {
            //     //  console.log("findOneGrib", data);
            //     that.showLoading = false;
            //     that.gribWind = data
            //   })
            // },
            updateLegend: function (data) {
              console.log("updateLegend- max:" + data.max + ",min:" + data.min)
              var legendCtx = this.$refs.legendCanvas.getContext('2d')
              var gradientCfg = data.gradient
              var gradient = legendCtx.createLinearGradient(0, 150, 0, 0)
              for (var key in gradientCfg) {
                gradient.addColorStop(key, gradientCfg[key])
              }
              legendCtx.fillStyle = gradient
              legendCtx.fillRect(0, 0, 30, 150)
              // this.$refs.gradient.src = this.$refs.legendCanvas.toDataURL()
              this.$store.dispatch('ACTION_WEATHER_LEGEND', {
                src: this.$refs.legendCanvas.toDataURL(),
                max: data.max.toFixed(1),       //最大值
                min: data.min.toFixed(1),       //最小值
                unit: '℃'      //单位
              })
            }
        },
        destroyed: function () {
          if(this.velocityLayer) {
            this.velocityLayer._destroyWind()
          }
          if(this.heatLayer) {
            this.$Maps.removeLayer(this.heatLayer);
          }
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
  .loadingCss {
    margin: 0  auto;
    margin-top: 50vh;
    display: block;
    width: 68px;
    height: 68px;
    background: url(../assets/newIcon/loading.png) no-repeat;
    animation: loading 0.8s infinite;
    -webkit-animation:loading 0.8s infinite;
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .noLoading {
    display: none;
    width: 68px;
    height: 68px;
  }

</style>
