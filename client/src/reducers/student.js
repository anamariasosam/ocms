import { FETCH_STUDENT_EVENTS, STUDENT_ERROR } from '../actions/types'

const INITIAL_STATE = {
  events: [],
  errorMessage: '',
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_STUDENT_EVENTS:
      return { ...state, events: action.payload }
    case STUDENT_ERROR:
      return { ...state, errorMessage: action.payload.errorMessage }
    default:
      return state
  }
}
