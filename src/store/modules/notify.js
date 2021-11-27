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
  snackbar: state => state.snackbar
}

const actions = {}

const mutations = {
  [types.ALERT](state, payload) {
    state.snackbar.text = payload.text
    state.snackbar.multiline = payload.text.length

    // Si es mas de 50 caracteres definirlo como multilinea
    if (payload.multiline) {
      state.snackbar.multiline = payload.multiline
    }

    // Color para mensajes de error o éxito
    if (payload.color) {
      state.snackbar.color = payload.color
    }

    // Tiempo de duración
    if (payload.timeout) {
      state.snackbar.timeout = payload.timeout
    }
    state.snackbar.visible = true
  },
  [types.CLOCEALERT](state) {
    state.snackbar.visible = false
    state.snackbar.multiline = false
    state.snackbar.text = null
  }
}

const state = {
  snackbar: {
    visible: false,
    color: 'success',
    text: null,
    timeout: 1000000,
    multiline: false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
