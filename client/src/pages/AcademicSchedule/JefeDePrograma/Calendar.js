import React from 'react'

import BigCalendar from '../BigCalendar'

const Calendar = ({ match, location }) => {
  const { programacionNombre } = match.params
  const { state } = location
  const date = programacionNombre ? state.event.fecha : new Date()

  return <BigCalendar calendarDate={date} />
}
export default Calendar
