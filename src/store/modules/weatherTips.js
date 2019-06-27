/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import {
  SET_WEATHER_TIP
} from '../mutation-types'

// initial state
const state = {
  text: 'weather',
  top: -100,
  left: -100
}

// getters
const getters = {
  text: state => state.text,
  top: state => state.top,
  left: state => state.left
}

// actions
const actions = {
  ACTION_WEATHER_TIP ({commit, state}, param) {
    commit(SET_WEATHER_TIP, param)
  }
}

// mutations
const mutations = {
  [SET_WEATHER_TIP] (state, data) {
    state.text = data.text
    state.top = data.top
    state.left = data.left
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

