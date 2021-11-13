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
import { addMinutes, format } from 'date-fns'
const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440

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
        nombre: payload.nombre,
        apellido: payload.apellido,
        credentialuser: payload.credentialuser,
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
          let userCred = ''
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
            console.log("Seteando parametro de session")

            window.localStorage.setItem(
              'user',
              JSON.stringify(response.data.responseUser.user)
            )
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.responseUser.token)
            )
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(
                  addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                  'X'
                )
              )
            )
            commit(types.SAVE_USER, response.data.responseUser.user)
            commit(types.SAVE_TOKEN, response.data.responseUser.token)
            commit(types.EMAIL_VERIFIED, response.data.responseUser.user.verified)
            userCred = response.data.responseUser.user.credentialuser
            resolve(response)
          }
          if (response.status === 200) {
            alert('agregado a usuario existente.')
            buildSuccess(
              {
                msg: 'common.PEOPLE_SUCCESSFULLY'
              },
              commit,
              resolve
            )
            
            console.log("savePeople:" + JSON.stringify(response))
            userCred = payload.credentialuser.credentialuser
            commit(types.SET_PEOPLE, response)
            resolve(response)
          }
          if (userCred != '') {
            api
              .getPeoples({
                id: userCred
              })
              .then(response => {
                console.log("getPeoples:" + JSON.stringify(response))
                if (response.status === 200) {
                  commit(types.PEOPLES, response.data.docs)
                  commit(types.TOTAL_PEOPLES, response.data.totalDocs)
                }
              })
              .catch(error => {
                handleError(error, commit, reject)
              })
          }



          if (response.status === 401) {
            alert('Debe iniciar session.')
            resolve({})
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
