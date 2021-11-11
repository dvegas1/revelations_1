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
import api from '@/services/api/adminComponents'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  components: state => state.components,
  totalComponents: state => state.totalComponents,
  allcomponents: state => state.allcomponents
}

const actions = {
  getComponents({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getComponents(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.COMPONENTS, response.data.docs)
            commit(types.TOTAL_COMPONENTS, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editComponents({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const data = {
        components: payload.components
      }
      api
        .editComponents(payload._id, data)
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
  saveComponents({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .saveComponents(payload)
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
  deleteComponents({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .deleteComponents(payload)
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
  getAllComponents({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getAllComponents(payload)
        .then(response => {
          if (response.status === 200) {
            const components = []
            const array = response.data
            array.forEach(element => {
              components.push(element.components)
            })
            commit(types.FILL_ALL_COMPONENTS, components)
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
  [types.COMPONENTS](state, components) {
    state.components = components
  },
  [types.TOTAL_COMPONENTS](state, value) {
    state.totalComponents = value
  },
  [types.FILL_ALL_COMPONENTS](state, components) {
    state.allcomponents = components
  }
}

const state = {
  components: [],
  totalComponents: 0,
  allcomponents: []
}

export default {
  state,
  getters,
  actions,
  mutations
}
