/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import {
  SET_PLAY_TIME
} from '../mutation-types'

// initial state
const state = {
  playTime: null,
}

// getters
const getters = {
  playTime: state => state.playTime
}

// actions
const actions = {
  ACTION_PLAY_TIME ({commit, state}, param) {
    commit(SET_PLAY_TIME, param)
  }
}

// mutations
const mutations = {
  [SET_PLAY_TIME] (state, data) {
    state.loadMapSuccess = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

