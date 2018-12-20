import axios from 'axios'
import cookie from 'react-cookies'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types'
import PACKAGE from '../../package.json'
import setPath from '../utils/role'

const API_URL = '/api'
const CLIENT_ROOT_URL = PACKAGE.config.url[process.env.NODE_ENV]

export const errorHandler = (dispatch, error, type) => {
  let errorMessage = ''

  console.log(error)

  if (error.data.error) {
    errorMessage = error.data.error
  } else if (error.data) {
    errorMessage = error.data
  } else {
    errorMessage = error
  }

  if (error.status === 401) {
    dispatch({
      type,
      payload: 'No se pudo realizar la acción. Verifica la información',
    })

    logoutUser()
  } else {
    dispatch({
      type,
      payload: errorMessage,
    })
  }
}

export const loginUser = data => {
  return dispatch => {
    axios
      .post(`${API_URL}/auth/login`, data)
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' })
        cookie.save('user', response.data.usuario, { path: '/' })
        dispatch({ type: AUTH_USER })

        window.location.href = CLIENT_ROOT_URL + setPath()
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      })
  }
}

export const editUser = data => {
  return dispatch => {
    axios
      .put(`${API_URL}/auth/editarPerfil`, data, {
        headers: { Authorization: cookie.load('token') },
      })
      .then(response => {
        cookie.save('token', response.data.token, { path: '/' })
        cookie.save('user', response.data.usuario, { path: '/' })
        dispatch({ type: AUTH_USER })

        window.location.href = CLIENT_ROOT_URL + setPath()
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR)
      })
  }
}

export const logoutUser = error => {
  return dispatch => {
    dispatch({ type: UNAUTH_USER, payload: error || '' })
    cookie.remove('token', { path: '/' })
    cookie.remove('user', { path: '/' })
    window.location.href = CLIENT_ROOT_URL
  }
}
