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
import api from '@/services/api/adminCities'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  totalCities: state => state.totalCities,
  cities: state => state.cities
}

const actions = {
  getCities({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getCities(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.CITIES, response.data.docs)
            commit(types.TOTAL_CITIES, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        status: payload.status,
        city: payload.city,
        cityID: payload.cityID,
        stateID: payload.stateID
      }
      api
        .editCity(payload._id, data)
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
  saveCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveCity(payload)
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
  deleteCity({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteCity(payload)
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
  [types.CITIES](state, value) {
    state.cities = value
  },
  [types.TOTAL_CITIES](state, value) {
    state.totalCities = value
  }
}

const state = {
  city: [],
  cities: [],
  totalCities: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
