import {
  CREATE_CALENDAR,
  CALENDAR_ERROR,
  DELETE_CALENDAR,
  FETCH_CALENDARS,
  UPDATE_CALENDAR,
} from '../actions/types'
const INITIAL_STATE = { errorMessage: '', calendars: [], successMessage: '' }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CALENDAR:
    case UPDATE_CALENDAR:
      return { ...state, successMessage: action.payload.successMessage }
    case CALENDAR_ERROR:
      return { ...state, calendars: [], errorMessage: action.payload.errorMessage }
    case DELETE_CALENDAR:
    case FETCH_CALENDARS:
      return { ...state, calendars: action.payload }
    default:
      return state
  }
}
