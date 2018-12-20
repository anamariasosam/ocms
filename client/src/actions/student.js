import { getData } from './index'
import { FETCH_STUDENT_EVENTS, STUDENT_ERROR } from './types'

export const fetchStudentEvents = params => {
  const url = '/estudiantes/eventos'
  return dispatch => getData(FETCH_STUDENT_EVENTS, STUDENT_ERROR, true, url, dispatch, params)
}
