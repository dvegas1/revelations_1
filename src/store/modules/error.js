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
  showErrorMessage: state => state.showErrorMessage,
  errorMessage: state => state.errorMessage
}

const mutations = {
  [types.ERROR](state, payload) {
    if (payload === null) {
      state.showErrorMessage = false
      state.errorMessage = null
    } else {
      state.showErrorMessage = true
      state.errorMessage = payload
    }
  },
  [types.SHOW_ERROR](state, payload) {
    state.showErrorMessage = !!payload
  }
}

const state = {
  showErrorMessage: false,
  errorMessage: null
}

export default {
  state,
  getters,
  mutations
}
