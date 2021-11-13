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
          let num = 0
          let temp = 0
          data = JSON.stringify(jsonValidate)
          try {
            minL = JSON.stringify(jsonValidate.$params.minlength.min)
            maxL = JSON.stringify(jsonValidate.$params.maxlength.max)
          } catch (error) {}

          const mensaje = [
            `El campo ${Model} es obligatorio`,
            `El campo ${Model} debe tener más de ${minL} caracteres`,
            `El campo ${Model} debe tener menos de ${maxL} caracteres`,
            `El campo ${Model} debe tener solo caracteres númericos`,
            `El campo ${Model} debe ser válido`,
            `El campo ${Model} debe tener un número, un carácter especial y tener más de 8 caracteres. Ejemplo: @Yone123`,
            `El campo ${Model} debe coincidir con tu contraseña`
          ]

          $("input[type='text'], [type='email'], [type='password']").each(
            function() {
              if ($(this).attr('name') === Model) {
                temp = num
                $(`.v-messages__message:eq(${temp})`).text('')
                $(`.v-messages__message:eq(${temp})`).val('')
              }
              num++
            }
          )

          JSON.parse(data, (key, value) => {
            if (
              JSON.stringify(value) !== '{}' &&
              JSON.stringify(value) === 'false'
            ) {
              if (key === 'required') {
                if (JSON.stringify(value) === 'false') {
                  $(`.v-messages__message:eq(${temp})`)
                    .addClass('menjErr')
                    .removeClass('success--text')
                    .append(mensaje[0])
                }
              }

              if (key === 'minlength') {
                if (JSON.stringify(value) === 'false') {
                  $(`.v-messages__message:eq(${temp})`)
                    .addClass('menjErr')
                    .removeClass('success--text')
                    .append(`<div> </div>${mensaje[1]}`)
                }
              }

              if (key === 'maxlength') {
                if (JSON.stringify(value) === 'false') {
                  $(`.v-messages__message:eq(${temp})`)
                    .addClass('menjErr')
                    .removeClass('success--text')
                    .append(mensaje[2])
                }
              }

              if (key === 'numeric') {
                if (JSON.stringify(value) === 'false') {
                  $(`.v-messages__message:eq(${temp})`)
                    .addClass('menjErr')
                    .removeClass('success--text')
                    .append(mensaje[3])
                }
              }

              if (key === 'email') {
                if (JSON.stringify(value) === 'false') {
                  $(`.v-messages__message:eq(${temp})`)
                    .addClass('menjErr')
                    .removeClass('success--text')
                    .append(`<div> </div>${mensaje[4]}`)
                }
              }
              if (key === 'strongPassword') {
                if (JSON.stringify(value) === 'false') {
                  $(`.v-messages__message:eq(${temp})`)
                    .addClass('menjErr')
                    .removeClass('success--text')
                    .append(`<div> </div>${mensaje[5]}`)
                }
              }

              if (key === 'sameAs') {
                if (JSON.stringify(value) === 'false') {
                  $(`.v-messages__message:eq(${temp})`)
                    .addClass('menjErr')
                    .removeClass('success--text')
                    .append(`<div> </div>${mensaje[6]}`)
                }
              }
            }
          })
        },
        ExistMail(jsonValidate, Model, boll) {
          let num = 1
          let temp = 0
          const mensaje = [
            `El correo electrónico ya existe`,
            `El correo electrónico es válido`,
            `El campo email debe ser válido`
          ]

          data = JSON.stringify(jsonValidate)
          $("[type='email']").each(function() {
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
          $("input[type='text']").each(function() {
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
        campoErrors(jsonCampo,name) {
          const errors = []
          if (name.$invalid && name.$dirty) {
            errors.push('')
            return errors
          }
        }
      }
    })
    Vue.prototype.$validGlobal = true
  },

  validations: {
    revelations:{
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
    signup: {
      username: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      email: {
        required,
        email,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      password: {
        required,
        strongPassword(password) {
          return (
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /\W|_/.test(password) &&
            password.length >= 8
          )
        }
      },
      confirmPassword: {
        required,
        sameAs: sameAs(vm => {
          return vm.password || ''
        })
      },
      firstname: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      secondname: {
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      firstsurname: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      secondsurname: {
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      date: {
        required
      },
      nroidentificacion: {
        required,
        minlength: minLength(5),
        maxlength: maxLength(30)
      },
      code: {
        required
      },
      myphone: {
        required,
        numeric,
        minlength: minLength(8),
        maxlength: maxLength(20)
      },
      country: {
        required
      },
      state: {
        required
      },
      city: {
        required
      },
      postalcode: {
        required,
        numeric,
        minlength: minLength(2),
        maxlength: maxLength(13)
      },
      storename: {
        required: requiredIf(function() {
          return this.$store.state.switch1.switch1.switch1boll
        }),
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      rif: {
        minlength: minLength(10),
        maxlength: maxLength(20)
      }
    },

    profile: {
      username: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      email: {
        required,
        email,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      firstname: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      secondname: {
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      firstsurname: {
        required,
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      secondsurname: {
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      date: {
        required
      },
      nroidentificacion: {
        required,
        minlength: minLength(5),
        maxlength: maxLength(30)
      },
      code: {
        required
      },
      myphone: {
        required,
        numeric,
        minlength: minLength(8),
        maxlength: maxLength(20)
      },
      country: {
        required
      },
      state: {
        required
      },
      city: {
        required
      },
      postalcode: {
        required,
        numeric,
        minlength: minLength(2),
        maxlength: maxLength(13)
      },
      storename: {
        required: requiredIf(function() {
          return this.$store.state.switch1.switch1.switch1boll
        }),
        minlength: minLength(3),
        maxlength: maxLength(30)
      },
      rif: {
        minlength: minLength(10),
        maxlength: maxLength(20)
      }
    },

    login: {
      credentialuser: {
        required,
        maxlength: maxLength(64)
      }
    }
  }
}
