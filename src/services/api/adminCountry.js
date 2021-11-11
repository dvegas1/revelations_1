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
  getCountry(params) {
    return axios.get('/country', {
      params
    })
  },
  editCountry(id, payload) {
    return axios.patch(`/country/${id}`, payload)
  },
  saveCountry(payload) {
    return axios.post('/country/', payload)
  },
  deleteCountry(id) {
    return axios.delete(`/country/${id}`)
  },
  getAllCoutry() {
    return axios.get('/country/all')
  }
}
