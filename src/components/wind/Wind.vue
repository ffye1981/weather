<template>
  <!--<el-button @click="getNextData">默认按钮</el-button>-->
  <div
    :class="showLoading ? 'loadingCss' :'noLoading'"
    >
   <canvas ref="legendCanvas" width="30" height="270" style="display: none"></canvas>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import weatherNameData from '../constant/weatherNameData.js'

    export default {
        name: 'Wind',
        data() {
            return {
              showLoading: false,
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
                  // .25: '#00192E',
                  // .25: "rgb(36,104, 180)",
                  // .50: 'green',
                  // .75: 'yellow',
                  // 1: 'red'
                  0.0645: "rgb(36,104, 180)",
                  0.1315: "rgb(60,157, 194)",
                  0.1985: "rgb(128,205,193 )",
                  0.2655: "rgb(151,218,168 )",
                  0.3325: "rgb(198,231,181)",
                  0.3995: "rgb(238,247,217)",
                  0.4665: "rgb(255,238,159)",
                  0.5335: "rgb(252,217,125)",
                  0.6005: "rgb(255,182,100)",
                  0.6675: "rgb(252,150,75)",
                  0.7345: "rgb(250,112,52)",
                  0.8015: "rgb(245,64,32)",
                  0.8685: "rgb(237,45,28)",
                  0.9355: "rgb(220,24,32)",
                  1: "rgb(180,0,35)",
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
                this.getData(hour);
                
                let legendData = this.velocityLayer._getWindyDefaultData();
                this.updateLegend(legendData);
              }
          },
          weatherParams: function (newVal, preVal) {
              // console.log('weatherParams改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              var hour = new Date(Date.parse(this.playTime.replace(/-/g, "/"))).getHours();
              if(this.velocityLayer) {
                this.showLoading = true;
                this.getData(hour)
                let legendData = this.velocityLayer._getWindyDefaultData();
                this.updateLegend(legendData);
              }
          },
          loadMapSuccess: function (newVal, preVal) {
              // console.log('loadMapSuccess改变之前的值：' + preVal + '；改变之后的值：' + newVal)
              if(newVal) {
                this.$Maps.addLayer(this.lyrGroup);
                // this.initLayer()
                this.getData(0)
                // if(this.velocityLayer) {
                //   let legendData = this.velocityLayer._getWindyDefaultData();
                //   this.updateLegend(legendData);
                // }
              }
          },
          windData: function (newVal, preVal) {
              if(this.velocityLayer) {
                  this.velocityLayer.setData(newVal);
                  console.log("velocityLayer_newVal", this.velocityLayer._getWindyDefaultData());
                  // this.heatLayer.setGribData(this.windData);
                  let legendData = this.velocityLayer._getWindyDefaultData();
                  this.updateLegend(legendData);
              }else {
                  this.initLayer();

                  let defaulColorScale = [
                    "rgb(36,104, 180)",
                    "rgb(60,157, 194)",
                    "rgb(128,205,193 )",
                    "rgb(151,218,168 )",
                    "rgb(198,231,181)",
                    "rgb(238,247,217)",
                    "rgb(255,238,159)",
                    "rgb(252,217,125)",
                    "rgb(255,182,100)",
                    "rgb(252,150,75)",
                    "rgb(250,112,52)",
                    "rgb(245,64,32)",
                    "rgb(237,45,28)",
                    "rgb(220,24,32)",
                    "rgb(180,0,35)"
                  ];
                  let legendData = {
                        minVelocityIntensity: 0,
                        maxVelocityIntensity: 60,
                        colorScale: defaulColorScale
                      };
                  this.updateLegend(legendData);
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
              // this.heatLayer = new HeatmapOverlay(this.heatCfg);
              // this.heatLayer.addTo(this.$Maps);
              // this.heatLayer.setGribData(this.windData);
              var that = this
              this.velocityLayer = L.velocityLayer({
                  displayValues: true,
                  displayOptions: {
                    velocityType: '全球风场',
                    displayPosition: 'bottomleft',
                    emptyString: '全球风场'
                  },
                  data: this.windData,
                  maxVelocity: 60,
                  // colorScale: [
                  //   "rgb(255,255,255)"
                  // ],
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
              console.log("velocityLayer_initLayer", this.velocityLayer._getWindyDefaultData());
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
                var that = this;
                // this.$http.getData(  weatherNameData[weatherType]   'static/data/gfs.t00z.pgrb2.1p00.f'+hour+'.json',{time: this.playTime}, {}, function (data, msg) {
                console.log(weatherNameData[this.weatherType], this.playTime, this.weatherParams.height);
                this.$http.getData(config.services.baseUrl + weatherNameData[this.weatherType] + "/findOneGrib", {refTime: this.playTime, surfaceValue: parseInt(this.weatherParams.height) * 1000}, {}, function (data, msg) {
                  //  console.log("findOneGrib", data);
                  that.showLoading = false;
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
          
              let legendCtx = this.$refs.legendCanvas.getContext('2d');
              let getWindyDefaultData = this.velocityLayer._getWindyDefaultData();
              let max = getWindyDefaultData.maxVelocityIntensity;
              let min = getWindyDefaultData.minVelocityIntensity;
              let colorScale = getWindyDefaultData.colorScale;
              let colorLength = colorScale.length;
              let textData = [];
              for (var i = 0; i < colorScale.length; i++){
                legendCtx.fillStyle = colorScale[i];
                let ratioData = 270 * i /(colorScale.length);
                let colorHeight = 270 / colorScale.length;
                // console.log("ratioData",i ,colorScale[i], colorHeight, ratioData);
                // legendCtx.font="12px Arial";
                // legendCtx.textAlign='center';
                // legendCtx.textBaseline='middle';
                let speendRate = ((max - min) * i / (colorScale.length - 1) + min).toFixed(1);
                // legendCtx.fillText(speendRate, 0, ratioData,);
                legendCtx.fillRect(
                  0, ratioData, 30, colorHeight
                );
                console.log("ratioData",i , speendRate, colorScale[i], colorHeight, ratioData);
                textData.push(speendRate);
              };
              console.log("textData",textData);
              this.$store.dispatch('ACTION_WEATHER_LEGEND', {
                colorScale: data.colorScale,
                textData: textData,
                src: this.$refs.legendCanvas.toDataURL(),
                max: max.toFixed(1),       //最大值
                min: min.toFixed(1),       //最小值
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
          if(this.velocityLayer){
            this.velocityLayer._destroyWind();
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
    background: url(../../assets/newIcon/loading.png) no-repeat;
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
