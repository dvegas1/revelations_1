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

import axios from 'axios'

export default {
  getComponents(params) {
    return axios.get('/components/', {
      params
    })
  },
  editComponents(id, payload) {
    return axios.patch(`/components/${id}`, payload)
  },
  saveComponents(payload) {
    return axios.post('/components/', payload)
  },
  deleteComponents(id) {
    return axios.delete(`/components/${id}`)
  },
  getAllComponents(params) {
    return axios.get('/components/all', {
      params
    })
  }
}
