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

import api from '@/services/api/messages'
import * as types from '@/store/mutation-types'
import { buildSuccess, handleError } from '@/utils/utils.js'

const getters = {
  message: state => state.message,
  name_components: state => state.name_components
}

const actions = {
  async getText_component({ commit }, json) {
    let jsonMensaje = ''
    return new Promise((resolve, reject) => {
      api
        .getText_component(json)
        .then(response => {
          const msgTemporal = {}
          const jsonTemporal = {}

          if (response.status === 200) {
            try {
              jsonMensaje = response.data
              jsonMensaje.forEach(element => {
                msgTemporal[element.idtext] = element
              })
              jsonTemporal[json.idcomponent] = msgTemporal
              commit(types.MESSAGE, jsonTemporal)
            } catch (error) {
              console.error(`ERROR[getText_component] ${error}`)
            }
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },

  name_component({ commit }, compenent) {
    commit(types.NAME_COMPONENTS, compenent)
  },

  getText_text({ commit }, jsontext) {
    return new Promise((resolve, reject) => {
      api
        .getText_text(jsontext)
        .then(response => {
          if (response.status === 200) {
            // const messageItems = response
            resolve(response.data)
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.MESSAGE](state, value) {
    state.message = value
  },
  [types.NAME_COMPONENTS](state, value) {
    state.name_components = value
  }
}

const state = {
  message: [],
  name_components: ''
}

export default {
  state,
  getters,
  actions,
  mutations
}
