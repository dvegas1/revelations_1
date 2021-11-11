/* eslint-disable no-invalid-this */
/* eslint-disable quotes */
/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint no-undef: "error"*/
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */ /* eslint-disable no-use-before-define */ /* eslint-disable no-empty */ /* eslint-disable no-irregular-whitespace */
/* eslint-disable no-constant-condition */ /* eslint-disable func-style */

import * as types from '@/store/mutation-types'

const getters = {
  switch1: state => state.switch1
}

const actions = {
  setSwitch({ commit }, data) {
    commit(types.ADD_SWITCH_DATA, data)
  }
}

const mutations = {
  [types.ADD_SWITCH_DATA](state, data) {
    state.switch1.switch1boll = data
  }
}

const state = {
  switch1: {
    switch1boll: false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
