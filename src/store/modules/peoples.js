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

import * as types from '@/store/mutation-types'
import api from '@/services/api/peoples'
import { buildSuccess, handleError, handleError_api } from '@/utils/utils.js'
import { resolve } from 'core-js/fn/promise'
import { addMinutes, format } from 'date-fns'
const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440

const getters = {
  totalPeoples: state => state.totalPeoples,
  peoples: state => state.peoples,
  set_User: state => state.set_User,
  RspsavePeople: state => state.RspsavePeople,
  notify: state => state.notify

}

const actions = {
  getPeoples({ commit }, __payload) {
    let payload = __payload
    return new Promise((resolve, reject) => {
      api
        .getPeoples(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.PEOPLES, response.data.docs)
            commit(types.TOTAL_PEOPLES, response.data.totalDocs)
          }
          resolve(response.data.docs)
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  editPeople({ commit }, payload) {
    console.log("payload:edit:" + JSON.stringify(payload))

    commit(types.NOTIFY, {
      duration: 4000,
      progress: 'auto',
      title: 'Modificando invitado.',
      text: payload.nombre + ' ' + payload.apellido,
      color: 'dark',
      position: 'bottom-center'
    })

    const data = {
      nombre: payload.nombre,
      apellido: payload.apellido,
      credentialuser: payload.credentialuser,
      id: payload._id
    }

    return new Promise((resolve, reject) => {
      api
        .editPeople(payload._id, data)
        .then(response => {
          if (response.status === 200) {

            commit(types.NOTIFY, {
              duration: 6000,
              progress: 'auto',
              title: 'Invitado modificado con éxito.',
              text: payload.nombre + ' ' + payload.apellido,
              color: 'success',
              position: 'bottom-center'
            })
            /* buildSuccess(
                {
                  msg: 'common.SAVED_SUCCESSFULLY'
                },
                commit,
                resolve
              )*/

            console.log("data:" + JSON.stringify(data))

            api
              .getPeoples({
                id: data.credentialuser
              })
              .then(response__ => {
                if (response__.status === 200) {
                  commit(types.PEOPLES, response__.data.docs)
                  commit(types.TOTAL_PEOPLES, response__.data.totalDocs)
                }
                resolve({ response__ })
              })


              .catch(error => {
                handleError_api(
                  error,
                  commit,
                  reject
                )
              })
          }
        })
        .catch(error => {
          handleError_api(
            error,
            commit,
            reject
          )
        })
    })
  },
  async savePeople({ commit }, payload) {
    console.log("payload:" + JSON.stringify(payload))
    let payload__ = JSON.parse(payload.peoples)
    commit(types.NOTIFY, {
      duration: 4000,
      progress: 'auto',
      title: 'Agregando a invitado',
      text: payload__[0].nombre + ' ' + payload__[0].apellido,
      color: 'dark',
      position: 'bottom-center'
    })
    return new Promise((resolve, reject) => {
      api
        .savePeople(payload)
        .then(response => {
          let userCred = ''
          let msgNotyfi = ''
          console.log("payload:" + JSON.stringify(payload))
          console.log("response:" + JSON.stringify(response))

          if (response.status === 201) {
            buildSuccess(
              {
                msg: 'common.PEOPLE_SUCCESSFULLY'
              },
              commit,
              resolve
            )
            commit(types.SET_PEOPLE, response)
            console.log("Seteando parametro de session")

            window.localStorage.setItem(
              'user',
              JSON.stringify(response.data.responseUser.user)
            )
            window.localStorage.setItem(
              'token',
              JSON.stringify(response.data.responseUser.token)
            )
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(
                  addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                  'X'
                )
              )
            )
            commit(types.SAVE_USER, response.data.responseUser.user)
            commit(types.SAVE_TOKEN, response.data.responseUser.token)
            commit(types.EMAIL_VERIFIED, response.data.responseUser.user.verified)
            userCred = response.data.responseUser.user.credentialuser

            let key = '<div class="container_key"> <div class="v-input text_key v-text-field v-input--is-label-active v-input--is-dirty theme--light"><div class="v-input__control"><div class="v-input__slot"><div class="v-text-field__slot"><input disabled id="myInput" value=' + userCred.trim() + ' autocomplete="off" type="text"></div></div><p id="st_text_copy"></p></div></div><button type="button" onclick="copyKey()" class="btn_light_copy v-btn--flat v-btn theme--light"><div class="v-btn__content"><i onclick="copyKey()" class="far fa-copy"></i></div></button></div>'
            msgNotyfi = '<p class="yourKey">Su clave de acceso es:</p>' + key + '	<p class="note">NOTA:<p><p class="text_note"> La clave de acceso es necesaria para ingresar en un futuro a la plataforma, debe guardarla ya que la misma no puede ser recuperada.</p></div>'
                  
            commit(types.NOTIFY, {
              duration: 6000,
              progress: 'auto',
              title: 'Invitado agregado con éxito.',
              text: payload__[0].nombre + ' ' + payload__[0].apellido,
              color: 'success',
              position: 'bottom-center'
            })


            buildSuccess(
              {
                msg: msgNotyfi
              },
              commit,
              resolve
            )

            resolve(response)
          }
          if (response.status === 200) {
            console.log("Response:" + JSON.stringify(response))
            userCred = response.data.credentialuser
            response.data.create.forEach(people => {
              commit(types.NOTIFY, {
                duration: 6000,
                progress: 'auto',
                title: 'Invitado agregado con éxito.',
                text: people.nombre + ' ' + people.apellido,
                color: 'success',
                position: 'bottom-center'
              })

            });

            // msgNotyfi = '<div class="accs"> <p class="text-success">Invitado guardado exitosamente.</p></div>'
            commit(types.SET_PEOPLE, response)

          }

          if (userCred != '') {
            api
              .getPeoples({
                id: userCred
              })
              .then(response => {
                if (response.status === 200) {
                  console.log("responseGet:" + JSON.stringify())
                  commit(types.PEOPLES, response.data.docs)
                  commit(types.TOTAL_PEOPLES, response.data.totalDocs)
                }
              })
              .catch(error => {
                handleError(error, commit, reject)
              })
          }

          if (response.status === 401) {
            console.error('Debe iniciar session.')
            resolve({})
          }

          if (response.status === 423) {
            console.error('Debe iniciar session.')
            resolve({})
          }


          /*
          
          buildSuccess(
                      {
                        msg: msgNotyfi
                      },
                      commit,
                      resolve
                    )
          */

          resolve(response)
        }).catch(error => {
          console.error(JSON.stringify(error.response))
          handleError_api(error, commit, reject)
        })
    })
  },
  deletePeople({ commit }, payload) {
    console.log("deletepayload: " + JSON.stringify(payload))

    commit(types.NOTIFY, {
      duration: 4000,
      progress: 'auto',
      title: 'Eliminando invitado.',
      text: payload.nombre + ' ' + payload.apellido,
      color: 'dark',
      position: 'bottom-center'
    })

    return new Promise((resolve, reject) => {
      api
        .deletePeople(payload._id)
        .then(response => {
          if (response.status === 200) {

            commit(types.NOTIFY, {
              duration: 6000,
              progress: 'auto',
              title: 'Invitado eliminado con éxito.',
              text: payload.nombre + ' ' + payload.apellido,
              color: 'success',
              position: 'bottom-center'
            })

            api
              .getPeoples({
                id: payload.cred
              })
              .then(response => {
                if (response.status === 200) {
                  commit(types.PEOPLES, response.data.docs)
                  commit(types.TOTAL_PEOPLES, response.data.totalDocs)
                }
              })
              .catch(error => {
                handleError(error, commit, reject)
              })


            resolve({})

            /*   buildSuccess(
                 {
                   msg: 'common.DELETED_SUCCESSFULLY'
                 },
                 commit,
                 resolve
               )*/
          }
        })
        .catch(error => {
          handleError(error, commit, reject)
        })
    })
  },
  setCred({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SET_USER, payload)

      resolve(true)
    })
  },
  sendNotify({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.NOTIFY, payload)
    })
  }
}

const mutations = {
  [types.PEOPLES](state, value) {
    state.peoples = value
  },
  [types.TOTAL_PEOPLES](state, value) {
    state.totalPeoples = value
  },
  [types.SET_USER](state, value) {
    state.set_User = value
  },
  [types.SET_PEOPLE](state, value) {
    state.RspsavePeople = value
  },
  [types.NOTIFY](state, value) {
    state.notify = value
  }
}

const state = {
  peoples: [],
  notify: {},
  set_User: '',
  RspsavePeople: [],
  totalPeoples: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
