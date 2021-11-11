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
import api from '@/services/api/allID'
import { /* buildSuccess,*/ handleError } from '@/utils/utils.js'

const getters = {
  allCountryID: state => state.allCountryID,
  allStateID: state => state.allStateID,
  allCityID: state => state.allCityID,
  allstatesContry: state => state.allstatesContry,
  allcitiesStates: state => state.allcitiesStates
}

const actions = {
  /* 1*/

  /* eslint max-statements: ["error", 30]*/
  /* eslint-env es6*/

  getAllID({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)
      api
        .getAllID(payload)
        .then(response => {
          if (response.status === 200) {
            const IDsCountry = response.data.allcountries
            /* console.log(
              `RESPONSECOUNTRY${JSON.stringify(response.data.allcountries)}`
            ) */
            const IDsState = response.data.allastates
            const IDscity = response.data.allcities
            const allCountryID = []
            const allStateID = []
            const allCityID = []

            IDsCountry.forEach(element => {
              // console.log(` id allcountrys: ${element.countryID}`)
              allCountryID.push(element.countryID)
            })

            IDsState.forEach(element => {
              // console.log(` id allastates: ${element.stateID}`)
              allStateID.push(element.stateID)
            })

            IDscity.forEach(element => {
              //  console.log(` id allcities: ${element.cityID}`)
              allCityID.push(element.cityID)
            })
            commit(types.FILL_ALL_COUNTRYID, allCountryID)
            commit(types.FILL_ALL_STATEID, allStateID)
            commit(types.FILL_ALL_CITYID, allCityID)
            resolve()
          }
        }) // 4
        .catch(error => {
          handleError(error, commit, reject)
        })
    }) // 3
  }, // 2

  getCountryAllStates({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)
      /* console.log(`apiid${JSON.stringify(payload)}`)
      if (JSON.stringify(payload.country) !== '') {
        return false
      }*/

      api
        .postCountryAllStates(payload)
        .then(response => {
          if (response.status === 200) {
            // console.log(` NewAPIstates: ${JSON.stringify(response.data)}`)
            const allstatesC = response.data.allastates
            const allstatesContry = []

            allstatesC.forEach(element => {
              allstatesContry.push(element.state)
            })
            commit(types.SELECT_ALL_STATES, allstatesContry)
            // resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },

  getStateAllCities({ commit }, payload) {
    return new Promise((resolve, reject) => {
      // commit(types.SHOW_LOADING, true)
      api
        .postStateAllCities(payload)
        .then(response => {
          if (response.status === 200) {
            // console.log(` NewAPIstates: ${response.data}`)
            const allcitiesC = response.data.allcities
            const allcitiesStates = []

            allcitiesC.forEach(element => {
              allcitiesStates.push(element.city)
            })
            commit(types.SELECT_ALL_CITIES, allcitiesStates)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
} // 1

const mutations = {
  [types.FILL_ALL_COUNTRYID](state, value) {
    state.allCountryID = value
  },
  [types.FILL_ALL_STATEID](state, value) {
    state.allStateID = value
  },
  [types.FILL_ALL_CITYID](state, value) {
    state.allCityID = value
  },
  [types.SELECT_ALL_STATES](state, value) {
    state.allstatesContry = value
  },
  [types.SELECT_ALL_CITIES](state, value) {
    state.allcitiesStates = value
  }
}

const state = {
  allCountryID: [],
  allStateID: [],
  allCityID: [],
  allstatesContry: [],
  allcitiesStates: []
}

export default {
  state,
  getters,
  actions,
  mutations
}

//  allastates allcountries allcities'
// allcountryID, allstateID, allcityID
// IDsCountry, IDsState, IDsCity
