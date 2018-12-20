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
} from '../actions/types'

const INITIAL_STATE = {
  errorMessage: '',
  agenda: [],
  successMessage: '',
  asignaturas: [],
  grupos: [],
  events: [],
  profesores: [],
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return { ...state, successMessage: action.payload.successMessage }
    case DELETE_EVENT:
    case FETCH_EVENT:
      return { ...state, events: action.payload }
    case UPDATE_EVENT:
      return { ...state, successMessage: action.payload.successMessage }
    case FETCH_SUBJECTS:
      return { ...state, asignaturas: action.payload }
    case FETCH_GROUPS:
      return { ...state, grupos: action.payload }
    case FETCH_ATTENDANTS:
      return { ...state, profesores: action.payload }
    case EVENT_ERROR:
    case GROUPS_ERROR:
    case SUBJECTS_ERROR:
      return { ...state, events: [], errorMessage: action.payload.errorMessage }
    default:
      return state
  }
}
