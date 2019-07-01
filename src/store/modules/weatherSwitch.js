/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import { SET_WEATHER_TYPE } from "../mutation-types";

// initial state
const state = {
  weatherType: 0, // 0 = 风
  dataParams: null
};

// getters
const getters = {
  weatherType: state => state.weatherType,
  dataParams: state => state.dataParams
};

// actions
const actions = {
  ACTION_WEATHER_TYPE({ commit, state }, param) {
    console.log("commit", param);
    commit(SET_WEATHER_TYPE, param);
  }
};

// mutations
const mutations = {
  [SET_WEATHER_TYPE](state, data) {
    console.log("mutations", data);
    state.weatherType = data.weatherType;
    state.dataParams = data.dataParams;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
