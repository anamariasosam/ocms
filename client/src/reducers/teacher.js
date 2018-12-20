import { FETCH_TEACHER_EVENTS, TEACHER_ERROR } from '../actions/types'

const INITIAL_STATE = {
  events: [],
  errorMessage: '',
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TEACHER_EVENTS:
      return { ...state, events: action.payload }
    case TEACHER_ERROR:
      return { ...state, events: [], errorMessage: action.payload.errorMessage }
    default:
      return state
  }
}
