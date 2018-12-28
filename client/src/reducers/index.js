import { combineReducers } from 'redux'
import auth from './auth'
import calendar from './calendar'
import agenda from './agenda'
import event from './event'
import student from './student'
import teacher from './teacher'

const rootReducer = combineReducers({
  auth,
  calendar,
  agenda,
  event,
  student,
  teacher,
})

export default rootReducer
