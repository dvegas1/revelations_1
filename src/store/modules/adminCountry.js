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
import api from '@/services/api/adminCountry'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  countrys: state => state.countrys,
  totalcountrys: state => state.totalcountrys,
  allcountrysname: state => state.allcountrysname,
  allcountryscode: state => state.allcountryscode
}

const actions = {
  getCountry({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getCountry(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.COUNTRYS, response.data.docs)
            commit(types.TOTAL_COUNTRY, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editCountry({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        status: payload.status,
        country: payload.country,
        countryID: payload.countryID,
        code: payload.code
      }
      api
        .editCountry(payload._id, data)
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
  saveCountry({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveCountry(payload)
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
  deleteCountry({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteCountry(payload)
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
  getAllCoutry({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getAllCoutry()
        .then(response => {
          if (response.status === 200) {
            const country = []
            const code = []

            const array = response.data
            array.forEach(element => {
              country.push(element.country)
              code.push(`+${element.code}`)
            })
            commit(types.COUNTRYS_NAME, country)
            commit(types.COUNTRYS_CODE, code)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.COUNTRYS](state, countrys) {
    state.countrys = countrys
  },
  [types.TOTAL_COUNTRY](state, value) {
    state.totalcountrys = value
  },
  [types.COUNTRYS_NAME](state, contr) {
    state.allcountrysname = contr
  },
  [types.COUNTRYS_CODE](state, contr) {
    state.allcountryscode = contr
  },

  [types.ADD_PROFILE_DATA](state, data) {
    try {
      // console.log(` key ${data.key}`)
      // console.log(` value ${data.value}`)
      // console.log(` DATA ${JSON.stringify(data)}`)
    } catch (error) {}
    switch (data.key) {
      case 'country':
        state.country = data.value
        break
      case 'state':
        state.estate = data.value
        break
      case 'city':
        state.city = data.value
        break
      case 'imgperfil':
        state.imgperfil = data.value
        break
      case 'file':
        state.file = data
        break
      default:
        break
    }
  }
}

const state = {
  countrys: [],
  totalcountrys: 0,
  allcountrysname: [],
  allcountryscode: [],
  allcountrys: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
