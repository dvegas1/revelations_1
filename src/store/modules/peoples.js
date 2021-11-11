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
import api from '@/services/api/peoples'
import { buildSuccess, handleError } from '@/utils/utils.js'
import { resolve } from 'core-js/fn/promise'

const getters = {
  totalPeoples: state => state.totalPeoples,
  peoples: state => state.peoples,
  set_User: state => state.set_User,
  RspsavePeople: state => state.RspsavePeople

}

const actions = {
  getPeoples({ commit }, __payload) {
    let payload = __payload
    return new Promise((resolve, reject) => {
      api
        .getPeoples(payload)
        .then(response => {
          console.log("getPeoples:" + JSON.stringify(response))
          if (response.status === 200) {
            commit(types.PEOPLES, response.data.docs)
            commit(types.TOTAL_PEOPLES, response.data.totalDocs)
          }
          resolve(response.data.docs)
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editPeople({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        status: payload.status,
        nombre: payload.nombre,
        apellido: payload.apellido,
        id: payload._id
      }
      api
        .editPeople(payload._id, data)
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
  async savePeople({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .savePeople(payload)
        .then(response => {
          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.PEOPLE_SUCCESSFULLY'
              },
              commit,
              resolve
            )
            commit(types.SET_PEOPLE, response)
            console.log("savePeople:" + JSON.stringify(response))
            resolve(response)
          } else {
            console.log(JSON.stringify(response))
          }
        })
        .catch(error => {
          alert(error)
          handleError(error, commit, reject)
        })
    })
  },
  deletePeople({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deletePeople(payload)
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
  },
  setCred({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SET_USER, payload)
      resolve(true)
    })
  }
}

const mutations = {
  [types.PEOPLES](state, value) {
    state.peoples = value
  },
  [types.TOTAL_PEOPLES](state, value) {
    state.totalPeoples = value
  },
  [types.SET_USER](state, value) {
    state.set_User = value
  },
  [types.SET_PEOPLE](state, value) {
    state.RspsavePeople = value
  }
}

const state = {
  peoples: [],
  set_User: '',
  RspsavePeople: [],
  totalPeoples: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
