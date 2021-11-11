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
import api from '@/services/api/profile'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  already_username_profile: state => state.it_already_username,
  profile: state => state.profile
}

const actions = {
  changeMyPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .changeMyPassword(payload)
        .then(response => {
          if (response.status === 200) {
            buildSuccess(
              {
                msg: 'myProfile.PASSWORD_CHANGED'
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

  getProfile({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .getProfile()
        .then(response => {
          if (response.status === 200) {
            commit(types.FILL_PROFILE, response.data)
            buildSuccess(null, commit, resolve)
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },

  verifiRegisterUsernameProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .verifiRegisterUsername(payload)
        .then(response => {
          if (response.status === 200) {
            console.log(` response: ${JSON.stringify(response)}`)
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

  saveProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .saveProfile(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.FILL_PROFILE, response.data)
            buildSuccess(
              {
                msg: 'myProfile.PROFILE_SAVED_SUCCESSFULLY'
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
  changeSecurity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .changeSecurity(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.FILL_PROFILE, response.data)
            buildSuccess(
              {
                msg: 'myProfile.PROFILE_SAVED_SUCCESSFULLY'
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
  consultTheHistory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true)
      api
        .consultTheHistory(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.FILL_PROFILE, response.data)
            buildSuccess(
              {
                msg: 'myProfile.PROFILE_SAVED_SUCCESSFULLY'
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
  addProfileData({ commit }, data) {
    commit(types.ADD_PROFILE_DATA, data)
  }
}

const mutations = {
  [types.FILL_PROFILE](state, data) {
    state.profile.verified = data.verified
    state.profile.imgperfil = data.imgperfil
    state.profile.username = data.username
    state.profile.email = data.email
    state.profile.firstname = data.firstname
    state.profile.secondname = data.secondname
    state.profile.firstsurname = data.firstsurname
    state.profile.secondsurname = data.secondsurname
    state.profile.birthayte = data.date
    state.profile.nroidentificacion = data.nroidentificacion
    state.profile.code = data.code
    state.profile.myphone = data.myphone
    state.profile.country = data.country
    state.profile.state = data.state
    state.profile.city = data.city
    state.profile.postalcode = data.postalcode
    state.profile.storename = data.storename
    state.profile.rif = data.rif
    state.profile.password = data.password
    state.profile.role = data.role
    state.profile.isstore = data.isstore
    // state.profile.name = data.name
  },
  [types.ADD_PROFILE_DATA](state, data) {
    switch (data.key) {
      case 'imgperfil':
        state.profile.imgperfil = data.value
        break
      case 'username':
        state.profile.username = data.value
        break
      case 'firstname':
        state.profile.firstname = data.value
        break
      case 'secondname':
        state.profile.secondname = data.value
        break
      case 'firstsurname':
        state.profile.firstsurname = data.value
        break
      case 'secondsurname':
        state.profile.secondsurname = data.value
        break
      case 'date':
        state.profile.birthayte = data.value
        break
      case 'nroidentificacion':
        state.profile.nroidentificacion = data.value
        break
      case 'code':
        state.profile.code = data.value
        break
      case 'myphone':
        state.profile.myphone = data.value
        break
      case 'country':
        state.profile.country = data.value
        break
      case 'state':
        state.profile.state = data.value
        break
      case 'city':
        state.profile.city = data.value
        break
      case 'postalcode':
        state.profile.postalcode = data.value
        break
      case 'storename':
        state.profile.storename = data.value
        break
      case 'rif':
        state.profile.rif = data.value
        break
      case 'password':
        state.profile.password = data.value
        break
      case 'role':
        state.profile.role = data.value
        break
      case 'isstore':
        state.profile.isstore = data.value

        break
      /* case 'name':
        state.profile.name = data.value
        break
      */
      default:
        break
    }
  }
}

const state = {
  profile: {
    verified: false,
    already_username_profile: false,
    imgperfil: '',
    username: '',
    email: '',
    firstname: '',
    secondname: '',
    firstsurname: '',
    secondsurname: '',
    birthayte: '',
    nroidentificacion: '',
    code: '',
    myphone: '',
    country: '',
    state: '',
    city: '',
    postalcode: '',
    storename: '',
    rif: '',
    password: '',
    role: '',
    isstore: ''
    // name: '',
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
