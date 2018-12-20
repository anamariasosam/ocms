import { getData, postData, putData, deleteData } from './index'
import {
  CREATE_AGENDA,
  DELETE_AGENDA,
  FETCH_AGENDA,
  UPDATE_AGENDA,
  AGENDA_ERROR,
  FETCH_EVENT_TYPES,
  EVENT_TYPE_ERROR,
} from './types'

const AGENDA_ENDPOINT = '/programaciones'

export const createAgenda = data => {
  const redirect = `/calendarioAcademico/programacion/show/${data.calendarioSemestre}`
  return dispatch =>
    postData(CREATE_AGENDA, AGENDA_ERROR, true, AGENDA_ENDPOINT, dispatch, data, redirect)
}

export const deleteAgenda = data => {
  return dispatch => deleteData(DELETE_AGENDA, AGENDA_ERROR, true, AGENDA_ENDPOINT, dispatch, data)
}

export const fetchAgenda = data => {
  return dispatch => getData(FETCH_AGENDA, AGENDA_ERROR, false, AGENDA_ENDPOINT, dispatch, data)
}

export const fetchEventTypes = () => {
  const url = '/tipoProgramaciones'
  return dispatch => getData(FETCH_EVENT_TYPES, EVENT_TYPE_ERROR, false, url, dispatch)
}

export const updateAgenda = data => {
  const redirect = `/calendarioAcademico/programacion/show/${data.data.calendarioSemestre}`

  return dispatch =>
    putData(UPDATE_AGENDA, AGENDA_ERROR, true, AGENDA_ENDPOINT, dispatch, data, redirect)
}
