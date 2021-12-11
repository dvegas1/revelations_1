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
  getConfig() {
    return axios.get('config/all', {
    })
  },
  getWinner(params) {
    return axios.get('/winner', {
      params
    })
  },
  updateWinner(payload) {
    console.log("enviando payload:"+JSON.stringify(payload))
    return axios.post(`/config/${payload._id}`,payload)
  },
  search_winner() {
    return axios.post('/winner')
  },
  searchPeople() {
    return axios.post('/winner/   ')
  },
  confirmPeople_winner(id) {
    return axios.patch(`/winner/${id}/confirm_winner`)
  },
  deleteWinner_adm(id) {
    return axios.delete(`/winner/delete_adm/${id}`)
  }
}
