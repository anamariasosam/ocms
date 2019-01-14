import axios from 'axios'
import cookie from 'react-cookies'
import PACKAGE from '../../package.json'

const API_URL = '/api'
const CLIENT_ROOT_URL = PACKAGE.config.url[process.env.NODE_ENV]

export const errorHandler = (dispatch, error, type) => {
  let errorMessage = 'Ocurrió un error'

  if (error) {
    if (error.data) {
      errorMessage = error.data.error
    } else if (error.statusText) {
      errorMessage = error.statusText
    } else {
      errorMessage = error
    }
  }

  const payload = {
    errorMessage,
  }

  dispatch({
    type,
    payload,
  })
}

// Post Request
export const postData = (action, errorType, isAuthReq, url, dispatch, data, redirect) => {
  const requestUrl = API_URL + url
  let headers = {}

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.load('token') } }
  }

  axios
    .post(requestUrl, data, headers)
    .then(response => {
      const payload = {
        data: response.data,
        successMessage: 'Creado con exito',
      }

      dispatch({
        type: action,
        payload,
      })

      // setTimeout(() => {
      //   window.location.href = CLIENT_ROOT_URL + redirect
      // }, 500)
    })
    .catch(error => {
      errorHandler(dispatch, error.response, errorType)
    })
}

// Get Request
export const getData = (action, errorType, isAuthReq, url, dispatch, params = {}) => {
  const requestUrl = API_URL + url
  let headers = {}

  if (isAuthReq) {
    headers = { Authorization: cookie.load('token') }
  }

  axios
    .get(requestUrl, { headers, params })
    .then(response => {
      dispatch({
        type: action,
        payload: response.data,
      })
    })
    .catch(error => {
      errorHandler(dispatch, error.response, errorType)
    })
}

// Put Request
export const putData = (action, errorType, isAuthReq, url, dispatch, data, redirect) => {
  const requestUrl = API_URL + url
  let headers = {}

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.load('token') } }
  }

  axios
    .put(requestUrl, data, headers)
    .then(response => {
      const payload = {
        data: response.data,
        successMessage: 'Editado con exito',
      }

      dispatch({
        type: action,
        payload,
      })

      setTimeout(() => {
        window.location.href = CLIENT_ROOT_URL + redirect
      }, 500)
    })
    .catch(error => {
      errorHandler(dispatch, error.response, errorType)
    })
}

// Delete Request
export const deleteData = (action, errorType, isAuthReq, url, dispatch, params) => {
  const requestUrl = API_URL + url
  let headers = {}

  if (isAuthReq) {
    headers = { Authorization: cookie.load('token') }
  }

  axios
    .delete(requestUrl, { headers, params })
    .then(response => {
      dispatch({
        type: action,
        payload: response.data,
      })
    })
    .catch(error => {
      errorHandler(dispatch, error.response, errorType)
    })
}
