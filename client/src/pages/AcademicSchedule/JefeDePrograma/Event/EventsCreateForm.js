import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import AditionalInfo from '../../../../components/AditionalInfo'
import Error from '../../../../components/Error'
import { fetchAsignaturas, createEvents, fetchAsignaturasEventos } from '../../../../actions/event'

class EventsCreateForm extends Component {
  constructor(props) {
    super(props)

    this.fecha = React.createRef()
    this.toolbarDOM = React.createRef()

    this.state = {
      eventos: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { fetchAsignaturas, fetchAsignaturasEventos, location } = this.props
    const { schedule } = location.state
    fetchAsignaturas()
    fetchAsignaturasEventos({ programacionNombre: schedule.nombre })
    document.addEventListener('scroll', this.handleSticky.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleSticky.bind(this))
  }

  handleSticky() {
    const scroll = window.innerHeight + window.pageYOffset
    const limit = document.body.offsetHeight - 450

    if (scroll > limit) {
      this.toolbarDOM.current.style.bottom = scroll - limit + 'px'
    } else {
      this.toolbarDOM.current.style.bottom = 0
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const { eventos } = this.state

    const { createEvents, location } = this.props
    const { schedule } = location.state
    const { _id: programacion, nombre: programacionNombre } = schedule

    const data = {
      eventos,
      programacion,
      programacionNombre,
    }

    createEvents(data)
  }

  handleChange(e) {
    const { eventos } = this.state

    const { id: asignatura, value: fecha } = e.target
    const evento = {}
    evento[asignatura] = fecha

    const newEvents = Object.assign(eventos, evento)

    this.setState({
      eventos: newEvents,
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
    const { asignaturas, events } = this.props

    return asignaturas.map(asignatura => {
      const rowClass = asignatura.nivel % 2 === 0 ? 'par' : 'impar'
      const fecha = events[asignatura.nombre]
      const fechaFormato = moment(fecha).format('YYYY-MM-DD[T]hh:mm')
      const defaultValue = (fecha && fechaFormato) || ''

      return (
        <tr key={asignatura._id} className={rowClass}>
          <td className="center">{asignatura.nivel}</td>
          <td>{asignatura.nombre}</td>
          <td className="center">{asignatura.creditos}</td>
          <td>
            <input
              type="datetime-local"
              id={asignatura._id}
              className="input events--inputs"
              onChange={this.handleChange}
              defaultValue={defaultValue}
            />
          </td>
        </tr>
      )
    })
  }

  renderAlert() {
    const { errorMessage } = this.props

    if (errorMessage) {
      return <Error description={errorMessage} />
    }
  }
}

EventsCreateForm.propTypes = {
  fetchAsignaturas: PropTypes.func.isRequired,
  createEvents: PropTypes.func.isRequired,
  asignaturas: PropTypes.array.isRequired,
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
  { fetchAsignaturas, createEvents, fetchAsignaturasEventos },
)(EventsCreateForm)
