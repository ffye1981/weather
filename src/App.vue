<template>
  <div id="app">
    <zg-map></zg-map>
    <time-slider></time-slider>
    <wind></wind>
  </div>
</template>

<script>
  import zgMap from './components/common/ZgMap'
  import timeSlider from './components/common/TimeSlider'
  import wind from './components/wind/Wind';
    // import wind from './components/wind/Wind_copy'      // test first


  export default {
      name: 'App',
      components: {
        zgMap,
        timeSlider,
        wind
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
.leaflet-top{
  display: none
}
</style>
