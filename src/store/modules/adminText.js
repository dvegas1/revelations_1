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
import api from '@/services/api/admintext'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  text: state => state.text,
  totaltext: state => state.totaltext
}

const actions = {
  getText({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getText(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.TEXT, response.data.docs)
            commit(types.TOTAL_TEXT, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editText({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        component: payload.component,
        idcontents: payload.idcontents,
        contents: payload.contents,
        description: payload.description
      }

      api
        .editText(payload._id, data)
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
  saveText({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveText(payload)
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
  deleteText({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteText(payload)
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
  [types.TEXT](state, text) {
    state.text = text
  },
  [types.TOTAL_TEXT](state, value) {
    state.totaltext = value
  }
}

const state = {
  text: [],
  totaltext: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
