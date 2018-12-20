import React from 'react'

import BigCalendar from '../BigCalendar'

const Calendar = ({ match }) => {
  const { programacionNombre } = match.params

  if (programacionNombre) {
    return <BigCalendar programacionNombre={programacionNombre} />
  }

  return <BigCalendar all />
}
export default Calendar
