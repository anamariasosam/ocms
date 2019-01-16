import React from 'react'
import moment from 'moment'
const EventAlert = ({ event }) => {
  const { title, lugar, start, end, tipo } = event
  return (
    <div>
      <h2 className="swal-title">{title}</h2>

      <p>
        <b>Tipo Evento:</b> {tipo}
      </p>
      {lugar && (
        <p>
          <b>Lugar: </b>
          {lugar}
        </p>
      )}

      <p>
        <b>Hora:</b> {moment(start).format('h:mm a')} - {moment(end).format('h:mm a')}
      </p>
    </div>
  )
}

export default EventAlert
