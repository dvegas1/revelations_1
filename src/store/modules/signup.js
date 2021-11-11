/* eslint-disable no-invalid-this */
/* eslint-disable quotes */
/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint no-undef: "error"*/
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-empty */ /* eslint-disable no-irregular-whitespace */
/* eslint-disable no-constant-condition */ /* eslint-disable func-style */

import * as types from '@/store/mutation-types'
import router from '@/router'
import api from '@/services/api/signup'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  it_already_email: state => state.it_already_email,
  it_already_username: state => state.it_already_username
}
const actions = {
  userSignUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .userSignUp(payload)
        .then(response => {
          if (response.status === 201) {
            window.localStorage.setItem(
              'user',
              JSON.stringify(response.data.user)
            )
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.token)
            )
            commit(types.SAVE_USER, response.data.user)
            commit(types.SAVE_TOKEN, response.data.token)

            buildSuccess(
              null,
              commit,
              resolve,
              router.push({
                name: 'home'
              })
            )
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  photoRegistration() {
    return new Promise((resolve, reject) => {
      api
        .photoRegistration(state.file)
        .then(response => {
          if (response.status === 201) {
          }

          resolve()
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  validateEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .verifiRegisterEmail(payload)
        .then(response => {
          if (response.status === 200) {
            resolve(response)
            commit(types.ADD_PROFILE_DATA, response)
          }
        })
        .catch(error => {
          resolve({ error: true })
        })
    })
  },
  verifiRegisterUsername({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .verifiRegisterUsername(payload)
        .then(response => {
          if (response.status === 200) {
            resolve(response)
            commit(types.ADD_PROFILE_DATA, response)
          }
        })
        .catch(error => {
          resolve({})
          handleError(error, commit, reject)
        })
    })
  },

  UrlDefault({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .UrlDefault()
        .then(response => {
          if (response.status === 200) {
            let url = 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm' // variable url para guardar lo que venga de base de datos
            const array = response.data.docs // guardamos en un array los dato que trae
            // la api de base de datos
            array.forEach(element => {
              if (
                element.url !== '' &&
                element.url !== null &&
                element.url !== undefined
              ) {
                url = element.url
              }
            }) // reccorremos el array: array, y asignamos a la variable
            // url el valor url del array: element.url

            const data = {
              key: 'imgperfil',
              value: url
            } // creamos una costante para guardar dos valores
            // key para su filtro, y value su valor

            commit(types.ADD_PROFILE_DATA, data)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  addItems({ commit }, data) {
    commit(types.ADD_PROFILE_DATA, data)
  },
  addForData({ commit }, data) {
    state.file = data
  }
}
const mutations = {}

const state = {
  country: '',
  state: '',
  city: '',
  // Agregado MAMD 11/05/2021
  imgperfil: '',
  it_already_username: false,
  it_already_email: false,
  file: new FormData(),
  saveImgU: ''
}

export default {
  state,
  getters,
  actions,
  mutations
}
