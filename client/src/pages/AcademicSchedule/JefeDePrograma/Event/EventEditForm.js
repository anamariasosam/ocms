import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import Success from '../../../../components/Success'
import Error from '../../../../components/Error'
import AditionalInfo from '../../../../components/AditionalInfo'
import {
  fetchAsignaturas,
  fetchGrupos,
  fetchEvent,
  updateEvent,
  fetchAttendats,
  fetchPlaces,
} from '../../../../actions/event'

class EventEditForm extends Component {
  constructor(props) {
    super(props)

    this.encargado = React.createRef()
    this.fechaInicio = React.createRef()
    this.fechaFin = React.createRef()
    this.aforo = React.createRef()
    this.grupo = React.createRef()
    this.lugar = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { fetchAsignaturas, fetchGrupos, fetchAttendats, fetchPlaces } = this.props
    fetchAsignaturas()
    fetchGrupos()
    fetchAttendats()
    fetchPlaces()
    this.getEventValues()
  }

  getEventValues() {
    const { match, fetchEvent } = this.props
    const { nombre } = match.params

    fetchEvent({ nombre })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { match, location, updateEvent } = this.props
    const fechaInicio = this.fechaInicio.current.value
    const fechaFin = this.fechaFin.current.value
    const aforo = this.aforo.current.value
    const encargado = this.encargado.current.value
    const lugar = this.lugar.current.value
    const grupo = this.grupo.current.value

    const { nombre } = match.params

    const { schedule } = location.state
    const { nombre: programacionNombre } = schedule

    const data = {
      params: {
        nombre,
      },
      data: {
        fechaInicio,
        fechaFin,
        aforo,
        grupo,
        lugar,
        encargado,
        programacionNombre,
      },
    }

    updateEvent(data)
  }

  render() {
    const titles = ['tipo', 'fecha Inicio', 'fecha Fin']
    const { profesores, location, lugares, grupos } = this.props

    const { schedule } = location.state

    this.renderEventValues()
    return (
      <Fragment>
        <h2>Gestionar Evento</h2>

        <AditionalInfo data={schedule} titles={titles} />

        <div className="form--container">
          <h3 className="form--title">Editar Evento</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="encargado" className="required label">
              Encargado:
            </label>
            <select id="encargado" className="input select--input" ref={this.encargado}>
              {profesores.map(encargado => (
                <option key={encargado._id} value={encargado._id}>
                  {encargado.nombre}
                </option>
              ))}
            </select>

            <label htmlFor="aforo" className="required label">
              Aforo:
            </label>
            <input type="number" id="aforo" className="input" ref={this.aforo} required />

            <label htmlFor="fechaInicio" className="required label">
              Fecha / Hora - Inicio:
            </label>
            <input
              type="datetime-local"
              id="fechaInicio"
              className="input"
              ref={this.fechaInicio}
              required
            />

            <label htmlFor="fechaFin" className="required label">
              Fecha / Hora - Fin:
            </label>
            <input
              type="datetime-local"
              id="fechaFin"
              className="input"
              ref={this.fechaFin}
              required
            />

            <label htmlFor="lugar" className="required label">
              Lugar:
            </label>
            <select id="lugar" className="input select--input" ref={this.lugar}>
              {lugares &&
                lugares.map(lugar => (
                  <option key={lugar._id} value={lugar._id}>
                    {lugar.nombre}
                  </option>
                ))}
            </select>

            <label htmlFor="grupo" className="label">
              Grupos:
            </label>
            <select id="grupo" className="input select--input" ref={this.grupo}>
              {grupos &&
                grupos.map(grupo => (
                  <option key={grupo._id} value={grupo._id}>
                    {`${grupo.asignatura.nombre}: ${grupo.nombre}`}
                  </option>
                ))}
            </select>

            <div className="form--controls">
              <input type="submit" value="Guardar" className="reset--button button" />
            </div>
          </form>

          {this.renderAlert()}
        </div>
      </Fragment>
    )
  }

  renderAlert() {
    const { errorMessage, successMessage } = this.props

    if (errorMessage) {
      return <Error description={errorMessage} />
    }
    if (successMessage) {
      return <Success description={successMessage} />
    }
  }

  renderEventValues() {
    const { events } = this.props
    const { fechaInicio, fechaFin, aforo, encargado, lugar, grupo } = events

    if (fechaInicio) {
      this.fechaInicio.current.value = moment(fechaInicio).format('YYYY-MM-DD[T]hh:mm')
    }

    if (fechaFin) {
      this.fechaFin.current.value = moment(fechaFin).format('YYYY-MM-DD[T]hh:mm')
    }

    if (aforo) {
      this.aforo.current.value = aforo
    }

    if (encargado) {
      this.encargado.current.value = encargado._id
    }

    if (lugar) {
      this.lugar.current.value = lugar._id
    }

    if (grupo) {
      this.grupo.current.value = grupo._id
    }
  }
}

EventEditForm.propTypes = {
  fetchAsignaturas: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  fetchGrupos: PropTypes.func.isRequired,
  fetchAttendats: PropTypes.func.isRequired,
  asignaturas: PropTypes.array.isRequired,
  profesores: PropTypes.array.isRequired,
  events: PropTypes.any.isRequired,
  grupos: PropTypes.any.isRequired,
  lugares: PropTypes.any,
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  fetchEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const {
    errorMessage,
    successMessage,
    asignaturas,
    grupos,
    events,
    profesores,
    lugares,
  } = state.event

  return {
    errorMessage,
    successMessage,
    asignaturas,
    grupos,
    events,
    profesores,
    lugares,
  }
}

export default connect(
  mapStateToProps,
  { fetchAsignaturas, fetchGrupos, fetchEvent, updateEvent, fetchAttendats, fetchPlaces },
)(EventEditForm)
