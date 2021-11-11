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
import api from '@/services/api/adminState'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  states: state => state.states,
  totalStates: state => state.totalStates
}

const actions = {
  getState({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getState(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.STATE, response.data.docs)
            // console.log(`response ${JSON.stringify(response.data.docs)}`)
            commit(types.TOTAL_STATE, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editState({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        status: payload.status,
        state: payload.state,
        stateID: payload.stateID,
        countryID: payload.countryID
      }
      api
        .editState(payload._id, data)
        .then(response => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
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
  },
  saveState({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveState(payload)
        .then(response => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.SAVED_SUCCESSFULLY'
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
  },
  deleteState({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteState(payload)
        .then(response => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'common.DELETED_SUCCESSFULLY'
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
  [types.STATE](state, value) {
    state.states = value
  },
  [types.TOTAL_STATE](state, value) {
    state.totalStates = value
  }
}

const state = {
  states: [],
  totalStates: 0,
  status: ['ACTIVADO', 'DESACTIVADO']
}

export default {
  state,
  getters,
  actions,
  mutations
}
