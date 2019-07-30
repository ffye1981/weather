/**
 * Created by FDD on 2017/9/14.
 * @desc 地图及地图工具store
 */

import { SET_WEATHER_TYPE, SET_WEATHER_OPTION } from "../mutation-types";

// initial state
const state = {
  weatherType: 0, // 0 = 风
  weatherParams: {
    height: "10km"
  }
};

// getters
const getters = {
  weatherType: state => state.weatherType,
  weatherParams: state => state.weatherParams
};

// actions
const actions = {
  ACTION_WEATHER_TYPE({ commit, state }, param) {
    // console.log("commit", param);
    commit(SET_WEATHER_TYPE, param);
  },
  ACTION_WEATHER_OPTION({ commit, state }, param) {
    console.log("commit", param);
    commit(SET_WEATHER_OPTION, param);
  }
};

// mutations
const mutations = {
  [SET_WEATHER_TYPE](state, data) {
    // console.log("mutations", data);
    state.weatherType = data.weatherType;
  },
  [SET_WEATHER_OPTION](state, data) {
    console.log("mutations", data);
    state.weatherParams = data.weatherParams;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
