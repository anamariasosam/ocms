import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AditionalInfo from '../../../../components/AditionalInfo'
import {
  fetchAsignaturaGrupos,
  fetchAttendats,
  fetchPlaces,
  updateGrupoEvent,
} from '../../../../actions/event'

class Event extends Component {
  constructor(props) {
    super(props)

    this.handleEventChange = this.handleEventChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      eventos: {},
    }
  }

  componentDidMount() {
    const { fetchAttendats, fetchPlaces } = this.props
    this.getEvents()
    fetchAttendats()
    fetchPlaces()
  }

  getEvents() {
    const { fetchAsignaturaGrupos, location } = this.props
    const { asignatura } = location.state

    fetchAsignaturaGrupos({ asignatura: asignatura._id })
  }

  handleEventChange(e) {
    const { eventos } = this.state
    const { id: event, value } = e.target

    const evento = {}
    evento[event] = (eventos[event] && { ...eventos[event] }) || {}
    evento[event][e.target.name] = value

    const newEvents = Object.assign(eventos, evento)

    this.setState({
      eventos: newEvents,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { eventos } = this.state

    const { updateGrupoEvent, location } = this.props
    const { schedule } = location.state
    const { nombre: programacionNombre } = schedule

    const data = {
      data: {
        programacionNombre,
        eventos,
      },
    }

    updateGrupoEvent(data)
  }

  render() {
    const { location } = this.props
    const { asignatura, fecha } = location.state

    const data = {
      nombre: asignatura.nombre,
      fecha,
    }
    const titles = ['nombre', 'fecha']

    return (
      <Fragment>
        <h2>Asignatura Evento</h2>

        <AditionalInfo data={data} titles={titles} handleSelect={this.handleTipoEvento} />

        <div className="module--container">
          <h3>Grupos</h3>

          <form onSubmit={this.handleSubmit}>
            <div className="table--responsive">
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th>NOMBRE</th>
                    <th>DOCENTE</th>
                    <th>OBSERVADOR</th>
                    <th>AFORO</th>
                    <th>LUGAR</th>
                  </tr>
                </thead>
                <tbody>{this.renderEvents()}</tbody>
              </table>
            </div>

            <div className="form--controls">
              <input type="submit" value="Guardar" className="reset--button button" />
            </div>
          </form>
        </div>
      </Fragment>
    )
  }

  renderEvents() {
    const { profesores, events, lugares } = this.props

    if (events.length > 0) {
      return events.map(event => (
        <tr key={event._id}>
          <td className="fixedWidth">
            {(event.grupo && `${event.grupo.asignatura.nombre} (Grupo: ${event.grupo.nombre})`) ||
              event.nombre}
          </td>
          <td className="fixedWidth">{event.docente.nombre}</td>
          <td>
            <select
              className="input select--input events--inputs"
              defaultValue={event.encargado && event.encargado._id}
              onChange={this.handleEventChange}
              id={event._id}
              name="encargado"
            >
              {profesores.map(encargado => (
                <option key={encargado._id} value={encargado._id}>
                  {encargado.nombre}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              type="number"
              id={event._id}
              className="input events--inputs aforo--input"
              onChange={this.handleEventChange}
              defaultValue={event.aforo}
              name="aforo"
            />
          </td>
          <td>
            <select
              className="input select--input events--inputs"
              defaultValue={event.lugar._id}
              onChange={this.handleEventChange}
              id={event._id}
              name="lugar"
            >
              {lugares &&
                lugares.map(lugar => (
                  <option key={lugar._id} value={lugar._id}>
                    {lugar.nombre}
                  </option>
                ))}
            </select>
          </td>
        </tr>
      ))
    }
  }
}

Event.propTypes = {
  fetchAsignaturaGrupos: PropTypes.func.isRequired,
  updateGrupoEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  events: PropTypes.any.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, events, profesores, lugares } = state.event

  return {
    errorMessage,
    events,
    profesores,
    lugares,
  }
}

export default connect(
  mapStateToProps,
  { fetchAsignaturaGrupos, fetchAttendats, fetchPlaces, updateGrupoEvent },
)(Event)
