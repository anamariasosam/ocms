import { getData, postData, putData, deleteData } from './index'
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
  UPDATE_EVENT,
  EVENT_ERROR,
  FETCH_SUBJECTS,
  SUBJECTS_ERROR,
  FETCH_GROUPS,
  GROUPS_ERROR,
  FETCH_ATTENDANTS,
} from './types'

const EVENT_ENDPOINT = '/eventosAcademicos'

export const createEvent = data => {
  const redirect = `/calendarioAcademico/evento/show/${data.programacionNombre}`
  return dispatch =>
    postData(CREATE_EVENT, EVENT_ERROR, true, EVENT_ENDPOINT, dispatch, data, redirect)
}

export const deleteEvent = params => {
  return dispatch => deleteData(DELETE_EVENT, EVENT_ERROR, true, EVENT_ENDPOINT, dispatch, params)
}

export const fetchEvent = params => {
  return dispatch => getData(FETCH_EVENT, EVENT_ERROR, false, EVENT_ENDPOINT, dispatch, params)
}

export const updateEvent = data => {
  const redirect = `/calendarioAcademico/evento/show/${data.data.programacionNombre}`

  return dispatch =>
    putData(UPDATE_EVENT, EVENT_ERROR, true, EVENT_ENDPOINT, dispatch, data, redirect)
}

export const fetchAsignaturas = () => {
  const url = '/asignaturas'
  return dispatch => getData(FETCH_SUBJECTS, SUBJECTS_ERROR, false, url, dispatch)
}

export const fetchGrupos = params => {
  const url = '/grupos'
  return dispatch => getData(FETCH_GROUPS, GROUPS_ERROR, false, url, dispatch, params)
}

export const fetchAttendats = () => {
  const url = '/usuarios/profesores'
  return dispatch => getData(FETCH_ATTENDANTS, EVENT_ERROR, false, url, dispatch)
}
