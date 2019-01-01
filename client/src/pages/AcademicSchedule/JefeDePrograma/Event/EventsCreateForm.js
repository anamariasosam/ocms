import React, { Component, Fragment } from 'react'
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

class EventsCreateForm extends Component {
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

        <div>
          <h3 className="form--title">Crear Múltiples Eventos</h3>
          <form onSubmit={this.handleSubmit}>
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>NIVEL</th>
                  <th>NOMBRE</th>
                  <th>CRÉDITOS</th>
                  <th>ELEGIR FECHA</th>
                </tr>
              </thead>
              <tbody>{this.renderAsignaturas()}</tbody>
            </table>
            <div className="form--controls">
              <input type="submit" value="Guardar" className="reset--button button" />
            </div>
          </form>

          {this.renderAlert()}
        </div>
      </Fragment>
    )
  }

  renderAsignaturas() {
    const { asignaturas } = this.props

    return asignaturas.map(asignatura => {
      const rowClass = asignatura.nivel % 2 === 0 ? 'par' : 'impar'

      return (
        <tr key={asignatura._id} className={rowClass}>
          <td className="center">{asignatura.nivel}</td>
          <td>{asignatura.nombre}</td>
          <td className="center">{asignatura.creditos}</td>
          <td>
            <input
              type="datetime-local"
              id="fecha"
              className="input events--inputs"
              ref={this.fecha}
              required
            />
          </td>
        </tr>
      )
    })
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

EventsCreateForm.propTypes = {
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
)(EventsCreateForm)
