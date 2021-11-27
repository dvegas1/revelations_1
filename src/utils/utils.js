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

import i18n from '@/plugins/i18n'
import * as types from '@/store/mutation-types'
import { isPast, format } from 'date-fns'
import { store } from '@/store'

const localesDateFns = {
  en: require('date-fns/locale/en'),
  es: require('date-fns/locale/es')
}

export const getFormat = (date, formatStr) => {
  return format(date, formatStr, {
    locale: localesDateFns[window.__localeId__]
  })
}

export const formatErrorMessages = (translationParent, msg, param) => {
  const errorArray = []
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg))

    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map(error => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`))
      })
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`))
    }
    return errorArray
  }
  // all good, return null
  return null
}

export const buildPayloadPagination = (pagination, search) => {
  const { sortBy, page, rowsPerPage } = pagination
  let { descending } = pagination
  // Gets order
  descending = descending ? -1 : 1

  let query = {}

  // If search and fields are defined
  if (search) {
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage,
      filter: search.query,
      fields: search.fields
    }
  } else {
    // Pagination with no filters
    query = {
      sort: sortBy,
      order: descending,
      page,
      limit: rowsPerPage
    }
  }
  return query
}

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, commit, reject) => {
  console.error(`error:${JSON.stringify(error)}`)
  let errMsg = ''
  // Resets errors in store
  commit(types.SHOW_LOADING, false)
  commit(types.ERROR, null)

  // Checks if unauthorized
  if (error.response.status === 401) {
    store.dispatch('userLogout')
  } else {
    // Any other error
    errMsg = error.response
      ? error.response.data.errors.msg
      : 'SERVER_TIMEOUT_CONNECTION_ERROR'
    setTimeout(() => {
      return errMsg
        ? commit(types.ERROR, errMsg)
        : commit(types.SHOW_ERROR, false)
    }, 0)
  }
  reject(error)
}
export const handleError_api = (error, commit, reject) => {
  // Resets errors in store

  const errMsg = ''

  if (error.response.status === 401) {
    /* store.dispatch('userLogout')*/
    commit(types.NOTIFY, {
      square: true,
      duration: 6000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Advertencia.</i><i class="far fa-check-circle"></i>`,
      text: `<p class='p_textNotify'>Ingrese su clave de acceso para continuar esta operación.</p>`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })

    window.localStorage.removeItem('token')
    window.localStorage.removeItem('tokenExpiration')
    window.localStorage.removeItem('user')
    commit(types.PEOPLES, [])
    commit(types.LOGOUT)
  } else {
    try {
      if (typeof error.response.data.errors != 'undefined') {
        setTimeout(() => {
          error.response.data.errors.msg
            ? commit(types.NOTIFY, {
                square: true,
                duration: 6000,
                progress: 'auto',
                title: `<i class='bx bx-folder-open' >Advertencia.</i><i class="far fa-check-circle"></i>`,
                text: `<p class='p_textNotify'>${error.response.data.errors.msg}</p>`,
                color: 'warn',
                position: 'bottom-center',
                width: '50%'
              })
            : commit(types.NOTIFY, {
                square: true,
                duration: 6000,
                progress: 'auto',
                title: `<i class='bx bx-folder-open' >Advertencia.</i><i class="far fa-check-circle"></i>`,
                text: `<p class='p_textNotify'>No se logro realizar la operación por favor intente de nuevo.</p>`,
                color: 'warn',
                position: 'bottom-center',
                width: '50%'
              })
        }, 0)
      } else {
        setTimeout(() => {
          return error.response.data.message
            ? commit(types.NOTIFY, {
                square: true,
                duration: 6000,
                progress: 'auto',
                title: `<i class='bx bx-folder-open' >Advertencia.</i><i class="far fa-check-circle"></i>`,
                text: `<p class='p_textNotify' >${error.response.data.message}. </p>`,
                color: 'warn',
                position: 'bottom-center',
                width: '50%'
              })
            : commit(types.NOTIFY, {
                square: true,
                duration: 6000,
                progress: 'auto',
                title: `<i class='bx bx-folder-open' >Advertencia.</i><i class="far fa-check-circle"></i>`,
                text: `<p class='p_textNotify'>No se logro realizar la operación por favor intente de nuevo.</p>`,
                color: 'warn',
                position: 'bottom-center',
                width: '50%'
              })
        }, 0)
      }
    } catch (error) {
      console.error(error)
    }
  }
  reject(error)
}

export const handleError_api1 = (error, commit, reject) => {
  // Resets errors in store
  commit(types.SHOW_LOADING, false)
  commit(types.ERROR, null)

  // Checks if unauthorized
  if (error.status === 401) {
    store.dispatch('userLogout')
  } else {
    // Any other error
    setTimeout(() => {
      return error.response.data.message.message
        ? commit(types.ERROR, error.response.data.message.message)
        : commit(types.SHOW_ERROR, false)
    }, 0)
  }
  reject(error)
}

export const buildSuccess = (msg, commit, resolve, resolveParam) => {
  commit(types.SHOW_LOADING, false)
  commit(types.SUCCESS, null)
  setTimeout(() => {
    return msg ? commit(types.SUCCESS, msg) : commit(types.SHOW_SUCCESS, false)
  }, 0)
  commit(types.ERROR, null)
  resolve(resolveParam)
}

export const buildSuccessFirst = (msg, commit, resolve, resolveParam) => {
  commit(types.SHOW_SUCCESS_FIRSUSER, false)
  commit(types.SUCCESS_FIRST_USER, null)
  setTimeout(() => {
    return msg
      ? commit(types.SUCCESS_FIRST_USER, msg)
      : commit(types.SHOW_SUCCESS_FIRSUSER, false)
  }, 0)
  commit(types.ERROR, null)
  resolve(resolveParam)
}

// Checks if tokenExpiration in localstorage date is past, if so then trigger an update
export const checkIfTokenNeedsRefresh = () => {
  // Checks if time set in localstorage is past to check for refresh token
  if (
    window.localStorage.getItem('token') !== null &&
    window.localStorage.getItem('tokenExpiration') !== null
  ) {
    if (
      isPast(
        new Date(
          JSON.parse(window.localStorage.getItem('tokenExpiration')) * 1000
        )
      )
    ) {
      store.dispatch('refreshToken')
    }
  }
}
