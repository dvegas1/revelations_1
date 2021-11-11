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
import api from '@/services/api/forgotPassword'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  resetEmailSent: state => state.resetEmailSent
}

const actions = {
  forgotPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .forgotPassword(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.RESET_EMAIL_SENT, true)
            buildSuccess(
              {
                msg: 'forgotPassword.RESET_EMAIL_SENT',
                params: [payload.email],
                timeout: 0
              },
              commit,
              resolve
            )
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.RESET_EMAIL_SENT](state, value) {
    state.resetEmailSent = value
  }
}

const state = {
  resetEmailSent: false
}

export default {
  state,
  getters,
  actions,
  mutations
}
