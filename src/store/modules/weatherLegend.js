/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import {
  SET_WEATHER_LEGEND,
  SHOW_WEATHER_LEGEND
} from '../mutation-types'

// initial state
const state = {
  visable: true, //是否显示
  src: null,    //色带地址
  max: 0,       //最大值
  min: 0,       //最小值
  unit: ''      //单位
}

// getters
const getters = {
  visable: state => state.visable,
  src: state => state.src,
  max: state => state.max,
  min: state => state.min,
  unit: state => state.unit
}

// actions
const actions = {
  ACTION_WEATHER_LEGEND ({commit, state}, param) {
    commit(SET_WEATHER_LEGEND, param)
  }
}

// mutations
const mutations = {
  [SET_WEATHER_LEGEND] (state, data) {
      state.src = data.src,
      state.max = data.max,
      state.min = data.min,
      state.unit = data.unit
  },
  [SHOW_WEATHER_LEGEND] (state, data) {
      state.visable = data
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}

