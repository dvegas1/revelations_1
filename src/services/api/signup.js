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
  userSignUp(payload) {
    return axios.post('/register', payload)
  },
  verifiRegisterEmail(payload) {
    return axios.post('/verifiRegisterEmail', payload)
  },
  verifiRegisterUsername(payload) {
    return axios.post('/verifiRegisterUsername', payload)
  },
  photoRegistration(payload) {
    return axios.post('/uploadPhotoPerfil', payload)
  },
  UrlDefault() {
    return axios.get('/users/imgperfildefault')
  } // Aqui consumimos la api osea le hacemos
  //  una consulta la llamamos, como sea pero vamos a la api
}
