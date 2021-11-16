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

import {
  required,
  minLength,
  email,
  maxLength,
  numeric,
  sameAs,
  requiredIf
} from 'vuelidate/lib/validators'
import $ from 'jquery'

let data = ''
let jsonPrueb = ''
let minL = ''
let maxL = ''

export default {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        osplug(jsonValidate, Model) {
          data = JSON.stringify(jsonValidate)
          try {
            minL = JSON.stringify(jsonValidate.$params.minlength.min)
            maxL = JSON.stringify(jsonValidate.$params.maxlength.max)
          } catch (error) { }


          const mensaje = [
            `El campo ${Model} es obligatorio`,
            `El campo ${Model} debe tener más de ${minL} caracteres`,
            `El campo ${Model} debe tener menos de ${maxL} caracteres`,
            `El campo ${Model} debe tener solo caracteres númericos`,
            `El campo ${Model} debe ser válido`,
            `El campo ${Model} debe tener un número, un carácter especial y tener más de 8 caracteres. Ejemplo: @Yone123`,
            `El campo ${Model} debe coincidir con tu contraseña`
          ]

          let response = ''

          JSON.parse(data, (key, value) => {


            if (
              JSON.stringify(value) !== '{}' &&
              JSON.stringify(value) === 'false'
            ) {

              if (key === 'required') {
                if (JSON.stringify(value) === 'false') {
                  response = mensaje[0]
                }
                return response
              }

              if (key === 'minlength') {
                if (JSON.stringify(value) === 'false') {
                  response = mensaje[1]
                }
                return response
              }

              if (key === 'maxlength') {
                if (JSON.stringify(value) === 'false') {
                  response = mensaje[2]
                }
                return response
              }
            }
          })
          return response
        },
        ExistMail(jsonValidate, Model, boll) {
          let num = 0
          let temp = 0
          const mensaje = [
            `El correo electrónico ya existe`,
            `El correo electrónico es válido`,
            `El campo email debe ser válido`
          ]

          data = JSON.stringify(jsonValidate)
          $("[type='email']").each(function () {
            if ($(this).attr('name') === Model) {
              temp = num
              $(`.v-messages__message:eq(${temp})`).val('')
              $(`.v-messages__message:eq(${temp})`).text('')
            } else {
              num++
            }
          })

          if (boll === null) {
            $(`.v-messages__message:eq(${temp})`)
              .addClass('menjErr')
              .removeClass('success--text')
              .append(mensaje[2])
            return
          }
          if (boll) {
            $(`.v-messages__message:eq(${temp})`)
              .addClass('menjErr')
              .removeClass('success--text')
              .append(mensaje[0])
          } else {
            $(`.v-messages__message:eq(${temp})`)
              .removeClass('menjErr')
              .addClass('success--text')
              .append(mensaje[1])
          }
        },
        ExistUserName(jsonValidate, Model, boll) {
          let num = 0
          let temp = 0
          const mensaje = [
            `El nombre de usuario ya existe`,
            `El nombre de usuario es válido`
          ]

          data = JSON.stringify(jsonValidate)
          $("input[type='text']").each(function () {
            if ($(this).attr('name') === Model) {
              temp = num
              $(`.v-messages__message:eq(${temp})`).val('')
              $(`.v-messages__message:eq(${temp})`).text('')
            } else {
              num++
            }
          })

          if (boll) {
            $(`.v-messages__message:eq(${temp})`)
              .addClass('menjErr')
              .removeClass('success--text')
              .append(mensaje[0])
          } else {
            $(`.v-messages__message:eq(${temp})`)
              .removeClass('menjErr')
              .addClass('success--text')
              .append(mensaje[1])
          }
        },
        subvali(jsonGlobal) {
          jsonPrueb = JSON.stringify(jsonGlobal)
          $.each(JSON.parse(jsonPrueb), (key, value) => {
            this.osplug(value, key)
          })
        },
        calcularEdad(birth) {
          const hoy = new Date()
          const cumpleanos = new Date(birth)
          let edad = hoy.getFullYear() - cumpleanos.getFullYear()
          const m = hoy.getMonth() - cumpleanos.getMonth()
          if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--
          }
          return edad
        },
        campoErrors(jsonValid, msgError) {
          let errors = []
          if (jsonValid.$invalid && jsonValid.$dirty) {
            if (msgError == '') {
              return
            }
            errors.push(msgError)
          } else {
            errors = []
          }
          return errors
        }
      }
    })
    Vue.prototype.$validGlobal = true
  },

  validations: {
    revelations: {
      nombre: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      apellido: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      editnombre: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      apellido: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      }
    },
    editedItem: {
      nombre: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      apellido: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      }

    },
    login:{
      credentialuser: {
        required,
        minlength: minLength(30),
        maxlength: maxLength(64)
      }
    }
  }
}
