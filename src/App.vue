<template>
  <div id="app">
    <zg-map></zg-map>
    <time-slider></time-slider>
    <wind></wind>
    <weather-tips></weather-tips>
  </div>
</template>

<script>
  import zgMap from './components/common/ZgMap'
  import timeSlider from './components/common/TimeSlider'
  import wind from './components/wind/Wind'
  import weatherTips from './components/common/WeatherTips'

  export default {
      name: 'App',
      components: {
        zgMap,
        timeSlider,
        wind,
        weatherTips
      }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
