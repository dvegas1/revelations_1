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
  getPeoples(params) {
    return axios.get(`/peoples/${params.id}`)
  },
  editPeople(id, payload) {
    return axios.patch(`/peoples/${id}`, payload)
  },
  savePeople(payload) {
    return axios.post('/peoples/add_peoples/', payload)
  },
  deletePeople(id) {
    return axios.delete(`/peoples/${id}`)
  }
}
