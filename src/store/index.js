import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import map from './modules/zgMap'
import timeSlider from './modules/timeSlider'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    map,
    timeSlider
  }
})
