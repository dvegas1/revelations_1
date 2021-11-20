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
  showSuccessMessage: state => state.successMessage,
  showSuccessMessageFirstUser: state => state.showSuccessMessageFirstUser,
  successMessage: state => state.successMessage,
  successMessageParams: state => state.successMessageParams,
  successMessageTimeout: state => state.successMessageTimeout,
  SuccessMessageFirstUser: state => state.SuccessMessageFirstUser
}

const mutations = {
  [types.SUCCESS](state, payload) {
    if (payload === null) {
      state.showSuccessMessage = false
      state.successMessage = null
      state.successMessageParams = []
    } else {
      state.showSuccessMessage = true
      state.successMessageTimeout =
        payload.timeout === 0 ? 0 : payload.timeout || 6000
      state.successMessage = payload.msg
      if (payload.params) {
        state.successMessageParams = payload.params
      }
    }
  },
  [types.SUCCESS_FIRST_USER](state, payload) {
    if (payload === null) {
      state.showSuccessMessageFirstUser = false
      state.SuccessMessageFirstUser = null
      state.successMessageParams = []
    } else {
      state.showSuccessMessageFirstUser = true
      state.successMessageTimeout =
        payload.timeout === 0 ? 0 : payload.timeout || 6000
      state.SuccessMessageFirstUser = payload.msg
      if (payload.params) {
        state.successMessageParams = payload.params
      }
    }
  },
  [types.SHOW_SUCCESS](state, payload) {
    state.showSuccessMessage = !!payload
  },
  [types.SHOW_SUCCESS_FIRSUSER](state, payload) {
    state.showSuccessMessageFirstUser = !!payload
  }
}

const state = {
  showSuccessMessage: false,
  showSuccessMessageFirstUser: false,
  SuccessMessageFirstUser: false,
  successMessage: null,
  successMessageParams: [],
  successMessageTimeout: 0
}

export default {
  state,
  getters,
  mutations
}
