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
import router from '@/router'
import api from '@/services/api/auth'
import { buildSuccess, handleError, handleError_api } from '@/utils/utils.js'
import { addMinutes, format } from 'date-fns'

const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440

const getters = {
  user: state => state.user,
  token: state => state.token,
  isTokenSet: state => state.isTokenSet
}

const actions = {
  userLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      commit(types.SHOW_SUCCESS_FIRSUSER, false)
      api
        .userLogin(payload)
        .then(response => {
          if (response.status === 200) {
            window.localStorage.setItem(
              'user',
              JSON.stringify(response.data.user)
            )
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.token)
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
            commit(types.SAVE_USER, response.data.user)
            commit(types.SAVE_TOKEN, response.data.token)
            commit(types.EMAIL_VERIFIED, response.data.user.verified)
            /*  buildSuccess(
                null,
                commit,
                resolve,
                router.push({
                  name: 'home'
                })
              )*/
            router.push({
              name: 'revelations'
            })

            commit(types.NOTIFY, {
              duration: 6000,
              progress: 'auto',
              title: 'Inicio exitoso.',
              text: 'Bienvenido.',
              color: 'success',
              position: null,
              width: '100%'
            })
            commit(types.SHOW_LOADING, false)
          }
        })
        .catch(error => {
          commit(types.SHOW_LOADING, false)
          handleError_api(error, commit, reject)
        })
    })
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .refreshToken()
        .then(response => {
          if (response.status === 200) {
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.token)
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
            commit(types.SAVE_TOKEN, response.data.token)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  autoLogin({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'))
    commit(types.SAVE_USER, user)
    commit(types.SAVE_TOKEN, JSON.parse(localStorage.getItem('token')))
    commit(types.SET_LOCALE, JSON.parse(localStorage.getItem('locale')))
    commit(types.EMAIL_VERIFIED, user.verified)
    commit(types.SHOW_SUCCESS_FIRSUSER, false)
  },
  userLogout({ commit }) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('tokenExpiration')
    window.localStorage.removeItem('user')
    commit(types.PEOPLES, [])
    commit(types.LOGOUT)
    commit(types.SHOW_SUCCESS_FIRSUSER, false)
    // alert(JSON.stringify(router))
    router.push({
      name: 'revelations'
    })
  }
}

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token
    state.isTokenSet = true
  },
  [types.LOGOUT](state) {
    state.user = null
    state.token = null
    state.isTokenSet = false
  },
  [types.SAVE_USER](state, user) {
    state.user = user
  }
}

const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem('token')) || null,
  isTokenSet: !!localStorage.getItem('token')
}

export default {
  state,
  getters,
  actions,
  mutations
}
