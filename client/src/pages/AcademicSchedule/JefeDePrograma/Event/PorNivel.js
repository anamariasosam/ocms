import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import AditionalInfo from '../../../../components/AditionalInfo'
import Error from '../../../../components/Error'
import Success from '../../../../components/Success'
import {
  fetchGrupos,
  createEvents,
  fetchAsignaturasEventos,
  fetchAttendats,
} from '../../../../actions/event'

class EventsCreateForm extends Component {
  constructor(props) {
    super(props)

    this.fecha = React.createRef()
    this.toolbarDOM = React.createRef()

    this.state = {
      grupos: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSticky = this.handleSticky.bind(this)
  }

  componentDidMount() {
    const { fetchGrupos, fetchAsignaturasEventos, fetchAttendats, location } = this.props
    const { schedule } = location.state
    const { nombre } = schedule
    const semestre = nombre.slice(0, 6)

    fetchGrupos({ semestre })
    fetchAttendats()
    fetchAsignaturasEventos({ programacionNombre: nombre })

    document.addEventListener('scroll', this.handleSticky)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleSticky)
  }

  handleSticky() {
    const scroll = window.innerHeight + window.pageYOffset
    const limit = document.body.offsetHeight - 450

    if (scroll > limit) {
      this.toolbarDOM.current.style.bottom = `${scroll - limit}px`
    } else {
      this.toolbarDOM.current.style.bottom = 0
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const { grupos } = this.state

    const { createEvents, location } = this.props
    const { schedule } = location.state
    const { _id: programacion, nombre: programacionNombre } = schedule

    const data = {
      grupos,
      programacion,
      programacionNombre,
    }

    createEvents(data)
  }

  handleInputChange(e) {
    const { grupos } = this.state
    const { id: event, value } = e.target

    const evento = {}
    evento[event] = (grupos[event] && { ...grupos[event] }) || {}
    evento[event][e.target.name] = value

    if (e.target.name === 'fechaInicio') {
      const fechaFin = moment(value)
        .add(2, 'hours')
        .format('YYYY-MM-DD[T]hh:mm')

      evento[event].fechaFin = fechaFin
    }

    const newEvents = Object.assign(grupos, evento)

    this.setState({
      grupos: newEvents,
    })
  }

  render() {
    const titles = ['tipo', 'fecha Inicio', 'fecha Fin']
    const { location } = this.props
    const { schedule } = location.state

    return (
      <Fragment>
        <h2>Programar Evento</h2>

        <AditionalInfo data={schedule} titles={titles} />

        <div>
          <h3 className="form--title">Programación discriminada por nivel</h3>
          <form onSubmit={this.handleSubmit}>
            <table className="table" id="eventsTable">
              <thead className="thead">
                <tr>
                  <th>NIVEL</th>
                  <th>GRUPO</th>
                  <th className="fixedWidth">NOMBRE ASIGNATURA</th>
                  <th>FECHA / HORA</th>
                  <th className="aforo-th">N° ESTUDIANTES</th>
                  <th className="fixedWidth">DOCENTE</th>
                  <th className="fixedWidth">OBSERVADOR</th>
                </tr>
              </thead>
              <tbody>{this.renderAsignaturas()}</tbody>
            </table>
            <div className="form--controls toolbar sticky-in" ref={this.toolbarDOM}>
              <input type="submit" value="Guardar" className="reset--button button saveBtn" />
            </div>
          </form>

          {this.renderAlert()}
        </div>
      </Fragment>
    )
  }

  renderAsignaturas() {
    const { location, grupos, profesores, events } = this.props
    const { schedule } = location.state
    const { fechaInicio, fechaFin } = schedule

    return grupos.map(grupoUsuario => {
      const { grupo, usuario } = grupoUsuario
      const { nombre: docente } = usuario
      const { asignatura, nombre } = grupo
      const rowClass = asignatura.nivel % 2 === 0 ? 'par' : 'impar'

      return (
        <tr key={grupo._id} className={rowClass}>
          <td className="center">{asignatura.nivel}</td>
          <td>{nombre}</td>
          <td className="fixedWidth">{asignatura.nombre}</td>
          <td>
            <input
              type="datetime-local"
              id={grupo._id}
              name="fechaInicio"
              className="input events--inputs"
              onChange={this.handleInputChange}
              min={fechaInicio.split('.')[0]}
              max={fechaFin.split('.')[0]}
              defaultValue={
                events[grupo._id] &&
                moment(events[grupo._id].fechaInicio).format('YYYY-MM-DD[T]hh:mm')
              }
            />
          </td>
          <td>
            <input
              type="number"
              id={grupo._id}
              className="input events--inputs aforo--input"
              onChange={this.handleInputChange}
              name="aforo"
              defaultValue={events[grupo._id] && events[grupo._id].aforo}
            />
          </td>
          <td>{docente}</td>
          <td>
            <select
              className="input select--input events--inputs"
              onChange={this.handleInputChange}
              id={grupo._id}
              name="encargado"
              defaultValue={events[grupo._id] && events[grupo._id].encargado}
            >
              <option value="" />
              {profesores.map(encargado => (
                <option key={encargado._id} value={encargado._id}>
                  {encargado.nombre}
                </option>
              ))}
            </select>
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
  fetchGrupos: PropTypes.func.isRequired,
  createEvents: PropTypes.func.isRequired,
  events: PropTypes.any.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, successMessage, asignaturas, grupos, profesores, events } = state.event

  return {
    errorMessage,
    successMessage,
    asignaturas,
    grupos,
    profesores,
    events,
  }
}

export default connect(
  mapStateToProps,
  { fetchAttendats, fetchGrupos, fetchAsignaturasEventos, createEvents },
)(EventsCreateForm)
