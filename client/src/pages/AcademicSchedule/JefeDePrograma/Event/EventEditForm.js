import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MultiSelect } from 'react-selectize'
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
} from '../../../../actions/event'

class EventEditForm extends Component {
  constructor(props) {
    super(props)

    this.encargado = React.createRef()
    this.fecha = React.createRef()
    this.aforo = React.createRef()
    this.grupos = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { fetchAsignaturas, fetchGrupos, fetchAttendats } = this.props
    fetchAsignaturas()
    fetchGrupos()
    fetchAttendats()
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
    const fecha = this.fecha.current.value
    const aforo = this.aforo.current.value
    const encargado = this.encargado.current.value
    const selectedGroups = this.grupos.current.state.values

    const grupos = selectedGroups.map(grupo => grupo.value)

    const { nombre } = match.params

    const { schedule } = location.state
    const { nombre: programacionNombre } = schedule

    const data = {
      params: {
        nombre,
      },
      data: {
        fecha,
        aforo,
        grupos,
        encargado,
        programacionNombre,
      },
    }

    updateEvent(data)
  }

  render() {
    const { profesores, location } = this.props
    const titles = ['tipo', 'fecha Inicio', 'fecha Fin']
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

            <label htmlFor="fecha" className="required label">
              Fecha / Hora:
            </label>
            <input type="datetime-local" id="fecha" className="input" ref={this.fecha} required />

            <label htmlFor="grupos" className="label">
              Grupos:
            </label>
            {this.renderMultiSelect()}

            <div className="form--controls">
              <input type="submit" value="Guardar" className="reset--button button" />
            </div>
          </form>

          {this.renderAlert()}
        </div>
      </Fragment>
    )
  }

  renderMultiSelect() {
    const { asignaturas, grupos, events } = this.props

    const asignaturasList = asignaturas.map(asignatura => ({
      groupId: asignatura._id,
      title: asignatura.nombre,
    }))

    const gruposList = grupos.map(grupo => ({
      groupId: grupo.asignatura._id,
      label: `${grupo.asignatura.nombre}: ${grupo.nombre}`,
      value: grupo._id,
    }))

    if (Object.keys(events).length > 0 && events.grupos) {
      const defaultValues = events.grupos.map(grupo => ({
        groupId: grupo.asignatura._id,
        label: `${grupo.asignatura.nombre}: ${grupo.nombre}`,
        value: grupo._id,
      }))

      return (
        <MultiSelect
          groups={asignaturasList}
          options={gruposList}
          placeholder="Elige los grupos"
          ref={this.grupos}
          defaultValues={defaultValues}
          anchor
        />
      )
    }
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
    const { fecha, aforo, encargado } = events

    if (fecha) {
      this.fecha.current.value = moment(fecha).format('YYYY-MM-DD[T]hh:mm')
    }

    if (aforo) {
      this.aforo.current.value = aforo
    }

    if (encargado) {
      this.encargado.current.value = encargado._id
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
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  fetchEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, successMessage, asignaturas, grupos, events, profesores } = state.event

  return {
    errorMessage,
    successMessage,
    asignaturas,
    grupos,
    events,
    profesores,
  }
}

export default connect(
  mapStateToProps,
  { fetchAsignaturas, fetchGrupos, fetchEvent, updateEvent, fetchAttendats },
)(EventEditForm)
