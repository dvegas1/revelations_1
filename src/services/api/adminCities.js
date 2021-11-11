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
  getCities(params) {
    return axios.get('/cities', {
      params
    })
  },
  editCity(id, payload) {
    return axios.patch(`/cities/${id}`, payload)
  },
  saveCity(payload) {
    return axios.post('/cities/', payload)
  },
  deleteCity(id) {
    return axios.delete(`/cities/${id}`)
  }
}
