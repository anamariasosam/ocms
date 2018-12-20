import {
  CREATE_AGENDA,
  DELETE_AGENDA,
  FETCH_AGENDA,
  UPDATE_AGENDA,
  AGENDA_ERROR,
  FETCH_EVENT_TYPES,
  EVENT_TYPE_ERROR,
} from '../actions/types'

const INITIAL_STATE = { errorMessage: '', schedules: [], successMessage: '', tipoProgramacion: [] }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_AGENDA:
    case UPDATE_AGENDA:
      return { ...state, successMessage: action.payload.successMessage }
    case DELETE_AGENDA:
    case FETCH_AGENDA:
      return { ...state, schedules: action.payload }
    case FETCH_EVENT_TYPES:
      return { ...state, tipoProgramacion: action.payload }
    case EVENT_TYPE_ERROR:
    case AGENDA_ERROR:
      return { ...state, errorMessage: action.payload.errorMessage }
    default:
      return state
  }
}
