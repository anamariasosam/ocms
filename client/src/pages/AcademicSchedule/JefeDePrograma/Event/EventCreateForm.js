import React, { Component, Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MultiSelect } from 'react-selectize'
import AditionalInfo from '../../../../components/AditionalInfo'
import Success from '../../../../components/Success'
import Error from '../../../../components/Error'
import {
  fetchAsignaturas,
  fetchGrupos,
  createEvent,
  fetchAttendats,
} from '../../../../actions/event'

import 'react-selectize/themes/index.css'

class EventCreateForm extends Component {
  constructor(props) {
    super(props)

    this.asignatura = React.createRef()
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
  }

  handleSubmit(e) {
    e.preventDefault()

    const fecha = this.fecha.current.value
    const aforo = this.aforo.current.value
    const encargado = this.encargado.current.value
    const { createEvent, location } = this.props
    const { schedule } = location.state

    const selectedGroups = this.grupos.current.state.values

    const grupos = selectedGroups.map(grupo => grupo.value)

    const { _id: programacion, nombre: programacionNombre } = schedule

    const data = {
      fecha,
      aforo,
      grupos,
      encargado,
      programacion,
      programacionNombre,
    }

    createEvent(data)
  }

  render() {
    const titles = ['tipo', 'fecha Inicio', 'fecha Fin']
    const { profesores, location } = this.props
    const { schedule } = location.state
    return (
      <Fragment>
        <h2>Programar Evento</h2>

        <AditionalInfo data={schedule} titles={titles} />

        <div className="form--container">
          <h3 className="form--title">Crear Evento</h3>
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
    const { asignaturas, grupos } = this.props

    const asignaturasList = asignaturas.map(asignatura => ({
      groupId: asignatura._id,
      title: asignatura.nombre,
    }))

    const gruposList = grupos.map(grupo => ({
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
      />
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
}

EventCreateForm.propTypes = {
  fetchAsignaturas: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
  fetchGrupos: PropTypes.func.isRequired,
  fetchAttendats: PropTypes.func.isRequired,
  asignaturas: PropTypes.array.isRequired,
  grupos: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  profesores: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, successMessage, asignaturas, grupos, profesores } = state.event

  return {
    errorMessage,
    successMessage,
    asignaturas,
    grupos,
    profesores,
  }
}

export default connect(
  mapStateToProps,
  { fetchAsignaturas, fetchGrupos, createEvent, fetchAttendats },
)(EventCreateForm)
