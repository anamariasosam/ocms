import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchEvent } from '../actions/event'

class Event extends Component {
  componentDidMount() {
    this.getEvents()
  }

  getEvents() {
    const { programacionNombre } = this.props

    this.handleEvent(programacionNombre)
  }

  handleEvent(programacionNombre) {
    const { fetchEvent } = this.props
    fetchEvent({ programacionNombre })
  }

  render() {
    const { events } = this.props

    if (events.length > 0) {
      return (
        <table className="table hidden" id="excelTable">
          <thead className="thead">
            <tr>
              <th>GRUPO</th>
              <th className="fixedWidth">NOMBRE ASIGNATURA</th>
              <th>FECHA</th>
              <th className="hora-th">HORARIO</th>
              <th className="aforo-th">N° ESTUDIANTES</th>
              <th className="aula-th">AULA</th>
              <th className="fixedWidth">DOCENTE</th>
              <th className="fixedWidth">OBSERVADOR</th>
            </tr>
          </thead>
          <tbody>{this.renderEvents()}</tbody>
        </table>
      )
    }

    return <p>No eventos</p>
  }

  renderEvents() {
    const { events } = this.props

    return events.map(event => (
      <tr key={event._id}>
        {event.grupo && <td className="center">{event.grupo && event.grupo.nombre}</td>}
        <td>{(event.grupo && event.grupo.asignatura.nombre) || event.nombre}</td>
        <td>{moment(event.fechaInicio).format('l')}</td>
        <td>
          {`${moment(event.fechaInicio).format('HH:mm')}
          -
          ${moment(event.fechaFin).format('HH:mm')}`}
        </td>
        <td className="center">{event.aforo}</td>
        <td />
        <td>{event.encargado.nombre}</td>
        <td>{event.encargado.nombre}</td>
      </tr>
    ))
  }
}

Event.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  events: PropTypes.any.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, events } = state.event

  return {
    errorMessage,
    events,
  }
}

export default connect(
  mapStateToProps,
  { fetchEvent },
)(Event)
