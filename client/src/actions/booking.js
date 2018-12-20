import { getData, postData, deleteData, putData } from './index'
import {
  CREATE_BOOKING,
  FETCH_BOOKING,
  DELETE_BOOKING,
  UPDATE_BOOKING,
  BOOKING_ERROR,
  FETCH_PLACES,
} from './types'

const BOOKING_ENDPOINT = '/reservas'
export const createReserva = data => {
  const redirect = `/calendarioAcademico/reserva/show/${data.eventoNombre}`
  return dispatch =>
    postData(CREATE_BOOKING, BOOKING_ERROR, true, BOOKING_ENDPOINT, dispatch, data, redirect)
}

export const deleteReserva = params => {
  return dispatch =>
    deleteData(DELETE_BOOKING, BOOKING_ERROR, true, BOOKING_ENDPOINT, dispatch, params)
}

export const fetchReserva = params => {
  return dispatch =>
    getData(FETCH_BOOKING, BOOKING_ERROR, false, BOOKING_ENDPOINT, dispatch, params)
}

export const updateReserva = data => {
  const redirect = `/calendarioAcademico/reserva/show/${data.data.eventoNombre}`

  return dispatch =>
    putData(UPDATE_BOOKING, BOOKING_ERROR, true, BOOKING_ENDPOINT, dispatch, data, redirect)
}

export const fetchPlaces = () => {
  const url = '/lugares'
  return dispatch => getData(FETCH_PLACES, BOOKING_ERROR, false, url, dispatch)
}
