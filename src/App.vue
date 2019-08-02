<template>
  <div id="app">
    <zg-map></zg-map>
    <time-slider></time-slider>
    <wind v-if="weatherType == 0"></wind>
    <temperature v-if="weatherType == 1"></temperature>
    <weather-tips :params_in="params"></weather-tips>
    <weather-legend-wind  v-if="weatherType == 0"></weather-legend-wind>
    <weather-legend v-if="weatherType == 1"></weather-legend>
    <weather-swticher></weather-swticher>
    <!-- <test></test>   -->
    <!-- <test-Point></test-Point> -->
    <heatmap v-if="weatherType == 10"></heatmap> 
    <weather-legend v-if="weatherType == 10"></weather-legend>
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
  import weatherLegendWind from './components/common/weatherLegendWind';
  import weatherSwticher from './components/common/WeatherSwitcher';

  import test from "./components/common/test";
  import testPoint from "./components/common/marker_with_custom_icons";
  import heatmap from "./components/heatmap";

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
        weatherLegendWind,
        weatherSwticher,
        // test,
        // testPoint,
        heatmap
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
