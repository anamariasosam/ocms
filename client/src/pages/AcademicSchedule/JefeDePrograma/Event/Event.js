import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DownloadExcel from 'react-html-table-to-excel'
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

  handleUrls(id) {
    const urls = ['/calendarioAcademico/', '/calendarioAcademico/evento/edit/']
    return urls.map(url => url.concat(id))
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
    const { schedules, events } = this.props
    const { tipo, nombre } = schedules
    const titles = ['tipo', 'fecha Inicio', 'fecha Fin']
    const allType = schedules.tipo !== 'Programación Académica'
    const semestre = nombre && nombre.slice(0, 6)
    const fileName = `${semestre} ${tipo}`

    return (
      <Fragment>
        <AditionalInfo data={schedules} titles={titles} />

        <div className="module--container">
          <h3>Programación para todos los niveles</h3>
          <div className="table--responsive">
            {events.length > 0 ? (
              <table className="table" id="eventsTable">
                <thead className="thead">
                  <tr>
                    {allType && (
                      <Fragment>
                        <th>GRUPO</th>
                        <th className="fixedWidth">NOMBRE ASIGNATURA</th>
                      </Fragment>
                    )}
                    {!allType && <th className="fixedWidth">NOMBRE EVENTO</th>}
                    <th>FECHA</th>
                    <th className="hora-th">HORARIO</th>
                    <th className="aforo-th">N° ESTUDIANTES</th>
                    <th className="aula-th">AULA</th>
                    <th className="fixedWidth">DOCENTE</th>
                    <th className="fixedWidth">OBSERVADOR</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>{this.renderEvents()}</tbody>
              </table>
            ) : (
              <div>
                <p>No hay eventos todavía...</p>
                <br />
              </div>
            )}
          </div>

          <Link
            to={{
              pathname: '/calendarioAcademico/evento/create',
              state: { schedule: schedules },
            }}
            className="reset--link button"
          >
            Añadir Evento
          </Link>

          {allType && (
            <Link
              to={{
                pathname: '/calendarioAcademico/evento/asignatura/',
                state: { schedule: schedules },
              }}
              className="reset--link button"
            >
              Programación discriminada por nivel
            </Link>
          )}

          <DownloadExcel
            className="button"
            sheet=""
            table="eventsTable"
            filename={fileName}
            buttonText="Descargar Excel"
          />
        </div>
      </Fragment>
    )
  }

  renderEvents() {
    const { events, schedules } = this.props
    if (events.length > 0) {
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
          <td>{event.lugar.nombre}</td>
          <td>{event.docente.nombre}</td>
          <td>{event.encargado.nombre}</td>
          <Options
            handleDelete={() => this.handleDelete(event._id)}
            urls={this.handleUrls(event.nombre)}
            state={{ schedule: schedules, event }}
            showTitle="Ver Calendario"
          />
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
