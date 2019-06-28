/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import {
  SET_WEATHER_TYPE
} from '../mutation-types'

// initial state
const state = {
  weatherType: 0   // 0 = 风
}

// getters
const getters = {
  weatherType: state => state.weatherType
}

// actions
const actions = {
  ACTION_WEATHER_TYPE ({commit, state}, param) {
    commit(SET_WEATHER_TYPE, param)
  }
}

// mutations
const mutations = {
  [SET_WEATHER_TYPE] (state, data) {
      state.weatherType = data
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}

