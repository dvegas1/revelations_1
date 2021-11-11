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
  getText_component(json) {
    // console.log('json: ' + JSON.stringify(json))
    return axios.get(`/text/idcomponent/${json.idcomponent}/${json.lenguage}`)
  },
  getText_text(jsontext) {
    // console.log('jsontext: ' + JSON.stringify(jsontext))
    return axios.get(`/text/idtext/${jsontext.idtext}/${jsontext.lenguage}`)
  }
  // Aqui consumimos la api osea le hacemos
  //  una consulta la llamamos, como sea pero vamos a la api
}
