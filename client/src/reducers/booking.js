import {
  CREATE_BOOKING,
  FETCH_BOOKING,
  DELETE_BOOKING,
  UPDATE_BOOKING,
  BOOKING_ERROR,
  FETCH_PLACES,
} from '../actions/types'

const INITIAL_STATE = {
  errorMessage: '',
  lugares: [],
  reservas: [],
  successMessage: '',
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_BOOKING:
      return { ...state, successMessage: action.payload.successMessage }
    case DELETE_BOOKING:
    case FETCH_BOOKING:
      return { ...state, reservas: action.payload }
    case UPDATE_BOOKING:
      return { ...state, successMessage: action.payload.successMessage }
    case FETCH_PLACES:
      return { ...state, lugares: action.payload }
    case BOOKING_ERROR:
      return { ...state, errorMessage: action.payload.errorMessage }
    default:
      return state
  }
}
