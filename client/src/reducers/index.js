import { combineReducers } from 'redux'
import auth from './auth'
import calendar from './calendar'
import agenda from './agenda'
import event from './event'
import student from './student'
import teacher from './teacher'
import booking from './booking'

const rootReducer = combineReducers({
  auth,
  calendar,
  agenda,
  event,
  student,
  teacher,
  booking,
})

export default rootReducer
