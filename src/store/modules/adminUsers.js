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
import api from '@/services/api/adminUsers'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  users: state => state.users,
  totalUsers: state => state.totalUsers
}

const actions = {
  getUsers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getUsers(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.USERS, response.data.docs)
            commit(types.TOTAL_USERS, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        role: payload.role,
        firstname: payload.firstname,
        secondname: payload.secondname,
        firstsurname: payload.firstsurname,
        secondsurname: payload.secondsurname,
        date: payload.date,
        nroidentificacion: payload.nroidentificacion,
        code: payload.code,
        myphone: payload.myphone,
        country: payload.country,
        state: payload.state,
        city: payload.city,
        postalcode: payload.postalcode,
        storename: payload.storename,
        rif: payload.rif
      }
      api
        .editUser(payload._id, data)
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
  saveUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveUser(payload)
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
  deleteUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteUser(payload)
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
  [types.USERS](state, users) {
    state.users = users
  },
  [types.TOTAL_USERS](state, value) {
    state.totalUsers = value
  }
}

const state = {
  users: [],
  country: [],
  totalUsers: 0,
  totalcountry: 69
}

export default {
  state,
  getters,
  actions,
  mutations
}
