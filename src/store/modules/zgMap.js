/**
 * Created by yeff
 * @desc 地图及地图工具store
 */

import {
  SET_MAP_LOAD_STATE
} from '../mutation-types'

// initial state
const state = {
  loadMapSuccess: false,
}

// getters
const getters = {
  loadMapSuccess: state => state.loadMapSuccess
}

// actions
const actions = {
  ACTION_MAP_STATE ({commit, state}, param) {
    commit(SET_MAP_LOAD_STATE, param)
  }
}

// mutations
const mutations = {
  [SET_MAP_LOAD_STATE] (state, data) {
    state.loadMapSuccess = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

