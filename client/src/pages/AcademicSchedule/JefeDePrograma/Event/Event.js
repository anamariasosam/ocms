import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import Options from '../../../../components/Options'
import AditionalInfo from '../../../../components/AditionalInfo'
import { deleteEvent, fetchEvent } from '../../../../actions/event'
import { fetchAgenda } from '../../../../actions/agenda'

class Event extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleTipoEvento = this.handleTipoEvento.bind(this)
  }

  componentDidMount() {
    this.getEvents()
  }

  getEvents() {
    const { match } = this.props
    const { nombre } = match.params

    this.handleEvent(nombre)
  }

  handleEvent(nombre) {
    const { fetchAgenda, fetchEvent } = this.props
    fetchAgenda({ nombre })
    fetchEvent({ programacionNombre: nombre })
  }

  handleTipoEvento(nombre) {
    console.log(nombre)
  }

  handleUrls(id) {
    const urls = ['/calendarioAcademico/reserva/show/', '/calendarioAcademico/evento/edit/']
    return urls.map(url => {
      return url.concat(id)
    })
  }

  handleDelete(id) {
    const confirmDelete = window.confirm('Estas seguro que deseas eliminar?')
    if (confirmDelete) {
      const { schedules, deleteEvent } = this.props
      const programacionId = schedules._id
      const eventoAcademicoId = id

      deleteEvent({
        programacionId,
        eventoAcademicoId,
      })
    }
  }

  render() {
    const { schedules } = this.props
    const titles = ['tipo', 'fecha Inicio', 'fecha Fin']
    return (
      <Fragment>
        <h2>Eventos</h2>

        <AditionalInfo data={schedules} titles={titles} handleSelect={this.handleTipoEvento} />

        <div className="module--container">
          <h3>Eventos</h3>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>ASIGNATURA</th>
                <th>ENCARGADO</th>
                <th>FECHA</th>
                <th>HORA</th>
                <th>AFORO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>{this.renderEvents()}</tbody>
          </table>

          <Link
            to={{
              pathname: '/calendarioAcademico/evento/create',
              state: { schedule: schedules },
            }}
            className="reset--link button"
          >
            + Evento
          </Link>
        </div>
      </Fragment>
    )
  }

  renderEvents() {
    const { events, schedules } = this.props
    if (events.length > 0) {
      return events.map(event => (
        <tr key={event._id}>
          <td>
            <ul>
              {event.grupos.map(grupo => (
                <li key={grupo.asignatura.nombre}>
                  {`${grupo.asignatura.nombre} (Grupo: ${grupo.nombre})`}
                </li>
              ))}
            </ul>
          </td>
          <td>{event.encargado.nombre}</td>
          <td>{moment(event.fecha).format('l')}</td>
          <td>{moment(event.fecha).format('h:mm a')}</td>
          <td>{event.aforo}</td>
          <td>
            <Options
              handleDelete={() => this.handleDelete(event._id)}
              urls={this.handleUrls(event.nombre)}
              state={{ schedule: schedules, event }}
              showTitle={'Ver Reservas'}
            />
          </td>
        </tr>
      ))
    }
  }
}

Event.propTypes = {
  fetchAgenda: PropTypes.func.isRequired,
  fetchEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  events: PropTypes.any.isRequired,
  schedules: PropTypes.any.isRequired,
  deleteEvent: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, events } = state.event
  const { schedules } = state.agenda

  return {
    errorMessage,
    schedules,
    events,
  }
}

export default connect(
  mapStateToProps,
  { deleteEvent, fetchEvent, fetchAgenda },
)(Event)
