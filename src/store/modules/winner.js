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
import api from '@/services/api/winner'
import {
  buildSuccess,
  handleError,
  handleError_api,
  buildSuccessFirst
} from '@/utils/utils.js'
import { resolve } from 'core-js/fn/promise'
import { addMinutes, format } from 'date-fns'
const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440

const getters = {
  totalwinner: state => state.totalwinner,
  winner: state => state.winner,
  config: state => state.config
}

const actions = {
  getConfig({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .getConfig()
        .then(response => {
          if (response.status === 200) {
            if(response.data){
              commit(types.CONFIG, response.data[0])
            }else{
              commit(types.CONFIG, {})
            }
          }
          resolve(response.data)
        })
        .catch(error => {
          handleError_api(error, commit, reject)
        })
    })
  },
  setTeamsWinner({ commit,state },payload) {
    return new Promise((resolve, reject) => {
      /*ACTUALIZAMOS*/
      commit(types.SHOW_LOADING, true)
      if (Object.keys(payload).length > 0) {

        commit(types.NOTIFY, {
          square: true,
          duration: 4000,
          progress: 'auto',
          title: `<i class='bx bx-folder-open' >Eligiendo ganador.</i><i class="fas fa-exclamation-circle"></i>`,
          text: `<p class='p_textNotify' >${payload.teams_winner}.</p>`,
          color: 'dark',
          position: 'bottom-center',
          width: '50%'
        })
        
        payload["_id"] = state.config._id
        console.info("Actualizamos ganador:" + JSON.stringify(payload))
        api
        .updateWinner(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.NOTIFY, {
              square: true,
              duration: 10000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Ganador elegido con éxito.</i><i class="far fa-check-circle"></i>`,
              text: `<p class='p_textNotify' >${`${response.data.teams_winner}`}. </p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })
            commit(types.SHOW_LOADING, false)
            console.log(JSON.stringify(response))
            resolve(response.data)
          }else{
            commit(types.SHOW_LOADING, false)
          }
          
        })
        .catch(error => {
          handleError_api(error, commit, reject)
          commit(types.SHOW_LOADING, false)
        })

      }else{
        log.info("Creamos ganador:" + JSON.stringify(payload))
        /*CREAMOS*/
      }
    })
  },
  getWinner({ commit }, __payload) {
    const payload = __payload
    return new Promise((resolve, reject) => {
      api
        .getWinner(payload)
        .then(response => {
          if (response.status === 200) {
            commit(types.WINNER, response.data.docs)
            commit(types.TOTALWINNER, response.data.totalDocs)
          }
          resolve(response.data.docs)
        })
        .catch(error => {
          handleError_api(error, commit, reject)
        })
    })
  },
  search_winner({ commit }) {
    commit(types.NOTIFY, {
      square: true,
      duration: 4000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Buscando ganador.</i><i class="far fa-check-circle"></i>`,
      color: 'success',
      position: 'bottom-center',
      width: '50%'
    })
    commit(types.SHOW_LOADING, true)

    return new Promise((resolve, reject) => {
      api
        .search_winner()
        .then(response => {
          if (response.status === 200) {
           
                                
              commit(types.NOTIFY, {
                square: true,
                duration: 6000,
                progress: 'auto',
                title: `<i class='bx bx-folder-open' >Ganador encontrado.</i><i class="far fa-check-circle"></i>`,
                text: `<p class='p_textNotify' >${response.data.winnerPeople.nombre} ${response.data.winnerPeople.apellido}. </p>`,
                color: 'success',
                position: 'bottom-center',
                width: '50%'
              })

              buildSuccess(
                {
                  msg:
                  `<p class='p_textNotify'>Ganador elegido:${response.data.winnerPeople.nombre} ${response.data.winnerPeople.apellido}, se debe confirmar el ganador para validar el proceso.</p>`
                },
                commit,
                resolve
              )


            api
              .getWinner({})
              .then(response => {
                if (response.status === 200) {



                  commit(types.WINNER, response.data.docs)
                  commit(types.TOTALWINNER, response.data.totalDocs)
                }
                resolve(response.data.docs)
              })
          }
          commit(types.SHOW_LOADING, false)
        })
        .catch(error => {
          commit(types.SHOW_LOADING, false)
          handleError_api(error, commit, reject)
        })
    })
  },
  confirmPeople_winner({ commit }, payload) {

    console.log("payload:" + JSON.stringify(payload))
    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Confirmado ganador.</i><i class="fas fa-exclamation-circle"></i>`,
      text: `<p class='p_textNotify' >Id:${payload._id}.</p>`,
      color: 'dark',
      position: 'bottom-center',
      width: '50%'
    })

    commit(types.SHOW_LOADING, true)

    return new Promise((resolve, reject) => {
      api
        .confirmPeople_winner(payload._id)
        .then(response => {
          if (response.status === 200) {
            commit(types.NOTIFY, {
              square: true,
              duration: 10000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Ganador confirmado.</i><i class="far fa-check-circle"></i>`,
              text: `<p class='p_textNotify' >${`${response.data.nombre} ${response.data.apellido}`}. </p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })
            commit(types.SHOW_LOADING, false)
            buildSuccess(
              {
                msg:
                  `<i'>Ganador confirmado con éxito.</i><i class="far fa-check-circle"></i>`
              },
              commit,
              resolve
            )
            api
              .getWinner({})
              .then(response => {
                if (response.status === 200) {
                  commit(types.WINNER, response.data.docs)
                  commit(types.TOTALWINNER, response.data.totalDocs)
                }
                resolve(response.data)
              })
              .catch(error => {
                commit(types.SHOW_LOADING, false)
                handleError_api(error, commit, reject)
              })
          }
        })
        .catch(error => {
          commit(types.SHOW_LOADING, false)
          handleError_api(error, commit, reject)
        })
    })
  },
  deleteWinner_adm({ commit }, payload) {
    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Editando usuario.</i><i class="fas fa-exclamation-circle"></i>`,
      text: `<p class='p_textNotify' >Eliminando ganador: ${payload.nombre} ${payload.apellido} </p>`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })

    return new Promise((resolve, reject) => {
      api
        .deleteWinner_adm(payload._id)
        .then(response => {
          if (response.status === 200) {
            commit(types.NOTIFY, {
              square: true,
              duration: 6000,
              progress: 'auto',
              title: `<i class='bx bx-folder-open' >Eliminado Invitado.</i><i class="far fa-check-circle"></i>`,
              text: `<p class='p_textNotify' >Ganador eliminado con éxito.</p>`,
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })

            api
              .getWinner({})
              .then(response => {
                if (response.status === 200) {
                  commit(types.WINNER, response.data.docs)
                  commit(types.TOTALWINNER, response.data.totalDocs)
                }
                resolve(response.data)
              })
              .catch(error => {
                commit(types.SHOW_LOADING, false)
                handleError_api(error, commit, reject)
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
          handleError_api(error, commit, reject)
        })
    })
  },
  addConfigData({ commit }, data) {
    commit(types.ADD_CONFIG_DATA, data)
  }
}

const mutations = {
  [types.WINNER](state, value) {
    state.winner = value
  },
  [types.TOTALWINNER](state, value) {
    state.totalwinner = value
  },
  [types.CONFIG](state, value) {
    state.config = value
  },
  [types.SET_CONFIG](state, value) {
    state.config = value
  },
  [types.ADD_CONFIG_DATA](state, data) {
    switch (data.key) {
      case 'teams_winner':
        console.log("Actualizando ganador:"+ data.value)
        state.config.teams_winner = data.value
        break
    }
  }
}

const state = {
    winner: [],
    notify: {},
    set_User: '',
    RspsavePeople: [],
    totalwinner: 0,
    vote: {},
    config: {teams_winner:''}
  }

export default {
    state,
    getters,
    actions,
    mutations
  }
