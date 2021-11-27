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
import api from '@/services/api/adminUsers'
import { buildSuccess, handleError, handleError_api } from '@/utils/utils.js'

const getters = {
  users: state => state.users,
  totalUsers: state => state.totalUsers
}

const actions = {
  getUsers({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getUsers(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.USERS, response.data.docs)
            commit(types.TOTAL_USERS, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError_api(error, commit, reject)
        })
    })
  },
  editUser_admin({ commit }, payload) {
    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Editando usuario.</i><i class="fas fa-exclamation-circle"></i>`,
      text: `<p class='p_textNotify' >Guardando usuario: ${payload.credentialuser} </p>`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })

    return new Promise((resolve, reject) => {
      const data = {
        role: payload.role,
        id: payload.id,
        credentialuser: payload.credentialuser
      }
      api
        .editUser(payload._id, data)
        .then(response => {
          if (response.status === 200) {
            commit(types.NOTIFY, {
              square: true,
              duration: 6000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Usuario editado con éxito.</i><i class="fas fa-exclamation-circle"></i>`,
              text: `<p class='p_textNotify' >Id: ${payload._id}. </p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })

            api
              .getUsers({sort:'updatedAt',order:-1})
              .then(response => {
                if (response.status === 200) {
                  commit(types.USERS, response.data.docs)
                  commit(types.TOTAL_USERS, response.data.totalDocs)
                  resolve()
                }
              })
              .catch(error => {
                handleError_api(
                  error,
                  commit,
                  reject
                )
              })
              resolve({})
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
  saveUser_admin({ commit }, payload) {


    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Guardando usuario.</i><i class="fas fa-exclamation-circle"></i>`,
      text: `<p class='p_textNotify' >Guardando usuario: ${payload.credentialuser} </p>`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })
    return new Promise((resolve, reject) => {
      api
        .saveUser(payload)
        .then(response => {
          if (response.status === 201) {
            commit(types.NOTIFY, {
              square: true,
              duration: 7000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Guardando usuario.</i><i class="fas fa-exclamation-circle"></i>`,
              text: `<p class='p_textNotify' >Usuario guardado con éxito: Rol:${payload.role} Clave:${payload.credentialuser}. </p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })

            api
              .getUsers({sort:'createdAt',order:-1})
              .then(response => {
                if (response.status === 200) {
                  commit(types.USERS, response.data.docs)
                  commit(types.TOTAL_USERS, response.data.totalDocs)
                  resolve()
                }
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
  /*ELIMINACION DE USUARIO PARA ADMINISTRADOR*/


  deleteUser_adm({ commit }, payload) {

    let msg = `<p class='p_textNotify' >Id: ${payload._id}. </p>`


    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Eliminación de usuario.</i><i class="fas fa-exclamation-circle"></i>`,
      text: msg,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })


    return new Promise((resolve, reject) => {
      api
        .deleteUser_adm(payload._id)
        .then(response => {
          if (response.status === 200) {

            commit(types.NOTIFY, {
              square: true,
              duration: 6000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Usuario elimado con éxito.</i><i class="fas fa-exclamation-circle"></i>`,
              text: `<p class='p_textNotify' >Id: ${payload._id}. </p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })

            /*   buildSuccess(
                 {
                   msg: 'common.DELETED_SUCCESSFULLY'
                 },
                 commit,
                 resolve
               )*/
            api
              .getUsers({sort:'createdAt',order:-1})
              .then(response => {
                if (response.status === 200) {
                  commit(types.USERS, response.data.docs)
                  commit(types.TOTAL_USERS, response.data.totalDocs)
                  resolve()
                }
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
          handleError_api(error, commit, reject)
        })
    })
  }
}

const mutations = {
  [types.USERS](state, users) {
    state.users = users
  },
  [types.TOTAL_USERS](state, value) {
    state.totalUsers = value
  }
}

const state = {
  users: [],
  country: [],
  totalUsers: 0,
  totalcountry: 69
}

export default {
  state,
  getters,
  actions,
  mutations
}
