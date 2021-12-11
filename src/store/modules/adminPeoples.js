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
import { buildSuccess, handleError_api } from '@/utils/utils.js'

const getters = {
  adm_peoples: state => state.adm_peoples,
  adm_totalPeoples: state => state.adm_totalPeoples
}

const actions = {
  getAllPeoples({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api
        .getAllPeoples(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.ADM_PEOPLE, response.data.docs)
            commit(types.ADM_TOTAL_PEOPLE, response.data.totalDocs)
            resolve()
          }
        })
        .catch(error => {
          handleError_api(error, commit, reject)
        })
    })
  },
  editPeople_adm({ commit }, payload) {
    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Editando usuario.</i><i class="fas fa-exclamation-circle"></i>`,
      text: `<p class='p_textNotify' >Id: ${payload._id} </p>`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })

    return new Promise((resolve, reject) => {
      const data = {
        id: payload.id,
        nombre: payload.nombre,
        apellido: payload.apellido,
        autorizeVote: payload.autorizeVote,
        vote: payload.vote,
        team: payload.team,
        credentialuser: payload.credentialuser
      }
      api
        .editPeople_adm(payload._id, data)
        .then(response => {
          if (response.status === 200) {
            commit(types.NOTIFY, {
              square: true,
              duration: 6000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Usuario editado con éxito.</i><i class="far fa-check-circle"></i>`,
              text: `<p class='p_textNotify' >Id: ${payload._id}. </p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })
          }
          api
            .getAllPeoples({ sort: 'updatedAt', order: -1 })
            .then(response => {
              if (response.status === 200) {
                commit(types.ADM_PEOPLE, response.data.docs)
                commit(types.ADM_TOTAL_PEOPLE, response.data.totalDocs)
              }
            })
            .catch(error => {
              handleError_api(error, commit, reject)
            })
          resolve({})
        })
        .catch(error => {
          handleError_api(error, commit, reject)
        })
    })
  },
  createPeople({ commit }, payload) {
    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Editando usuario.</i><i class="fas fa-exclamation-circle"></i>`,
      text: `<p class='p_textNotify' >Creando invitado: ${payload.nombre} ${payload.nombre} </p>`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })

    return new Promise((resolve, reject) => {
      api
        .createPeople(payload)
        .then(response => {
          if (response.status === 201) {
            commit(types.NOTIFY, {
              square: true,
              duration: 6000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Invitado creado con éxito.</i><i class="far fa-check-circle"></i>`,
              text: `<p class='p_textNotify' >${payload.nombre} ${payload.nombre}.</p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })

            api
              .getAllPeoples({ sort: 'createdAt', order: -1 })
              .then(response => {
                if (response.status === 200) {
                  commit(types.ADM_PEOPLE, response.data.docs)
                  commit(types.ADM_TOTAL_PEOPLE, response.data.totalDocs)
                }
                resolve({})
              })
              .catch(error => {
                handleError_api(error, commit, reject)
              })
          }
        })
        .catch(error => {
          handleError_api(error, commit, reject)
        })
    })
  },
  /* ELIMINACION DE PERSONA PARA ADMINISTRADOR*/
  deletePeople_adm({ commit }, payload) {
    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Editando usuario.</i><i class="fas fa-exclamation-circle"></i>`,
      text: `<p class='p_textNotify' >Eliminando invitado: ${payload.nombre} ${payload.apellido} </p>`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })
    return new Promise((resolve, reject) => {
      api
        .deletePeople_adm(payload._id)
        .then(response => {
          if (response.status === 200) {
            commit(types.NOTIFY, {
              square: true,
              duration: 6000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Eliminado Invitado.</i><i class="far fa-check-circle"></i>`,
              text: `<p class='p_textNotify' >Invitado eliminado con éxito.</p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })

            api
              .getAllPeoples({ sort: 'createdAt', order: -1 })
              .then(response => {
                if (response.status === 200) {
                  commit(types.ADM_PEOPLE, response.data.docs)
                  commit(types.ADM_TOTAL_PEOPLE, response.data.totalDocs)
                  resolve(response.data.docs)
                }
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
  [types.ADM_PEOPLE](state, users) {
    state.adm_peoples = users
  },
  [types.ADM_TOTAL_PEOPLE](state, value) {
    state.adm_totalPeoples = value
  }
}

const state = {
  adm_peoples: [],
  adm_totalPeoples: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
