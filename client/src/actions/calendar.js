import { getData, postData, putData, deleteData } from './index'
import {
  CREATE_CALENDAR,
  CALENDAR_ERROR,
  DELETE_CALENDAR,
  FETCH_CALENDARS,
  UPDATE_CALENDAR,
} from './types'

const CALENDAR_ENDPOINT = '/calendarios'
const REDIRECT_URL = '/calendarioAcademico/calendario'

export const createCalendar = data => {
  return dispatch =>
    postData(CREATE_CALENDAR, CALENDAR_ERROR, true, CALENDAR_ENDPOINT, dispatch, data, REDIRECT_URL)
}

export const deleteCalendar = data => {
  return dispatch =>
    deleteData(DELETE_CALENDAR, CALENDAR_ERROR, true, CALENDAR_ENDPOINT, dispatch, data)
}

export const fetchCalendars = data => {
  return dispatch =>
    getData(FETCH_CALENDARS, CALENDAR_ERROR, true, CALENDAR_ENDPOINT, dispatch, data)
}

export const updateCalendar = data => {
  return dispatch =>
    putData(UPDATE_CALENDAR, CALENDAR_ERROR, true, CALENDAR_ENDPOINT, dispatch, data, REDIRECT_URL)
}
