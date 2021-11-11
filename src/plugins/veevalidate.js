/* eslint-disable no-invalid-this */
/* eslint-disable quotes */
/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint no-undef: "error"*/
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-empty */ /* eslint-disable no-irregular-whitespace */
/* eslint-disable no-constant-condition */ /* eslint-disable func-style */

import Vue from 'vue'
import VeeValidate from 'vee-validate'
import es from '../locales/es.json'
import en from '../locales/en.json'
import cn from '../locales/cn.json'

const veeValidateConfig = {
  locale: JSON.parse(localStorage.getItem('locale')) || 'es',
  dictionary: {
    en,
    es,
    cn
  }
}
// var msg = es.profile
const localeJson = JSON.parse(localStorage.getItem('locale'))
Vue.use(VeeValidate, veeValidateConfig)

/* setTimeout(function () {

  localeJson = JSON.parse(localStorage.getItem('locale'))

switch (localeJson) {
  case 'es':
    msg = es.profile
    break;
    case 'en':
      msg = en.profile
      break;
      case 'cn':
      msg = cn.profile
      break;
  default:
    console.log("NADA")
    msg = es.profile
    break;
}
console.log(msg.TITLE)


}.bind(this), 1000) */
/* var msg = ""
Vue.use(VeeValidate, veeValidateConfig)

VeeValidate.Validator.extend('prohibirPalabras', {
	getMessage: (campo, argumentos) => {
		console.log("argumentos es un arreglo " + argumentos.join(" ") )
    console.log("IDIOMA " + JSON.parse(localStorage.getItem('locale')))

    return argumentos.join(" ")
	},
	validate: (value,valor, argumentos) => {
		//return argumentos.every(argumento => !valor.includes(argumento))
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      return strongRegex.test(value);
	},events: "change"

});


/*Vue.use(VeeValidate, veeValidateConfig)
VeeValidate.Validator.extend('verify_password', {
  getMessage: msg.TITLE,

  validate: value => {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      return strongRegex.test(value);
  }

});*/
