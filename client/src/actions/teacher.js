import { getData } from './index'
import { FETCH_TEACHER_EVENTS, TEACHER_ERROR } from './types'

export const fetchTeacherEvents = params => {
  const url = '/profesores/eventos'

  return dispatch => getData(FETCH_TEACHER_EVENTS, TEACHER_ERROR, true, url, dispatch, params)
}
