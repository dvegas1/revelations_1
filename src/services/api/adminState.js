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
  getState(params) {
    return axios.get('/adminstate', {
      params
    })
  },
  editState(id, payload) {
    return axios.patch(`/adminstate/${id}`, payload)
  },
  saveState(payload) {
    return axios.post('/adminstate/', payload)
  },
  deleteState(id) {
    return axios.delete(`/adminstate/${id}`)
  }
}
