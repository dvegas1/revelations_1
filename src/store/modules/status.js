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
  status: state => state.status
}

const actions = {
  addSatusData({ commit }, data) {
    commit(types.ADD_STATUS_DATA, data)
  }
}

const mutations = {
  [types.ADD_STATUS_DATA](state, data) {
    switch (data.key) {
      case 'status':
        state.status = data.value
        break
      default:
        break
    }
  }
}

const state = {
  allstatus: ['ACTIVADO', 'DESACTIVADO']
}

export default {
  state,
  getters,
  actions,
  mutations
}
