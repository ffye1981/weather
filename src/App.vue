<template>
  <div id="app">
    <zg-map></zg-map>
    <time-slider></time-slider>
    <wind v-if="weatherType == 0"></wind>
    <temperature v-if="weatherType == 1"></temperature>
    <geopotential-height v-if="weatherType == 2"></geopotential-height>
    <ice-water v-if="weatherType == 3"></ice-water>
    <precipitable-water v-if="weatherType == 4"></precipitable-water>
    <relative-humidity v-if="weatherType == 5"></relative-humidity>
    <cloud-cover v-if="weatherType == 6"></cloud-cover>
    <visibility v-if="weatherType == 7"></visibility>
    <vertical-velocity v-if="weatherType == 8"></vertical-velocity>
    <wind-speed-gust v-if="weatherType == 9"></wind-speed-gust>

    <weather-tips :params_in="params"></weather-tips>
    <weather-legend-wind  v-if="weatherType == 0"></weather-legend-wind>
    <weather-legend v-if="weatherType == 1 || weatherType == 3 || weatherType == 4 || weatherType == 5 || weatherType == 6 || weatherType == 7 || weatherType == 8 || weatherType == 9"></weather-legend>
    <weather-legend-geopotential-height v-if="weatherType == 2"></weather-legend-geopotential-height>
    <weather-swticher></weather-swticher>
    <!-- <test></test>   -->
    <!-- <test-Point></test-Point> -->
    <!-- <heatmap v-if="weatherType == 10"></heatmap> 
    <weather-legend v-if="weatherType == 10"></weather-legend> -->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import zgMap from './components/common/ZgMap'
  import timeSlider from './components/common/TimeSlider'
  import wind from './components/wind/Wind'
  import temperature from './components/Temperature'
  import weatherTips from './components/common/WeatherTips';
  import weatherLegend from './components/common/WeatherLegend';
  import WeatherLegendGeopotentialHeight from './components/common/WeatherLegendGeopotentialHeight';
  import weatherLegendWind from './components/common/weatherLegendWind';
  import weatherSwticher from './components/common/WeatherSwitcher';
  import geopotentialHeight from './components/geopotentialHeight';
  import iceWater from './components/iceWater';
  import precipitableWater from './components/precipitableWater';
  import relativeHumidity from './components/relativeHumidity';
  import cloudCover from './components/cloudCover';
  import visibility from './components/visibility';
  import verticalVelocity from './components/verticalVelocity';
  import windSpeedGust from './components/windSpeedGust';

  // import test from "./components/common/test";
  // import testPoint from "./components/common/marker_with_custom_icons";
  // import heatmap from "./components/heatmap";

  export default {
      name: 'App',
      data () {
        return {
          params: {
            fullHeight: document.documentElement.clientHeight,
            fullWidth: document.documentElement.clientWidth
          }
        }
      },
      computed: {
        ...mapState({
          weatherType: state => state.weatherSwitcher.weatherType
        }),
      },
      mounted () {
        const that = this
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight
            window.fullWidth = document.documentElement.clientHeight
            that.params.fullHeight = window.fullHeight
            that.params.fullWidth = window.fullWidth
          })()
        }
      },
      components: {
        zgMap,
        timeSlider,
        wind,
        temperature,
        weatherTips,
        weatherLegend,
        WeatherLegendGeopotentialHeight,
        weatherLegendWind,
        weatherSwticher,
        geopotentialHeight,
        iceWater,
        precipitableWater,
        relativeHumidity,
        cloudCover,
        visibility,
        verticalVelocity,
        windSpeedGust,
        // test,
        // testPoint,
        // heatmap
      }
  }
</script>

<style>
body,p { margin:0; padding:0; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.leaflet-top{
  display: none
}
</style>
