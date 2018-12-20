import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Options from '../../../../components/Options'
import { deleteCalendar, fetchCalendars } from '../../../../actions/calendar'

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const { fetchCalendars } = this.props
    fetchCalendars()
  }

  handleUrls(id) {
    const urls = [
      '/calendarioAcademico/programacion/show/',
      '/calendarioAcademico/calendario/edit/',
    ]
    return urls.map(url => url.concat(id))
  }

  handleDelete(calendarioId) {
    const confirmDelete = window.confirm('Estas seguro que deseas eliminar?')
    if (confirmDelete) {
      const params = {
        calendarioId,
      }

      const { deleteCalendar } = this.props
      deleteCalendar(params)
    }
  }

  render() {
    return (
      <Fragment>
        <h2>Calendarios</h2>

        <div className="module--container">
          <h3>Calendarios</h3>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>SEMESTRE</th>
                <th>FECHA INICIO</th>
                <th>FECHA FIN</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>{this.renderCalendars()}</tbody>
          </table>

          <Link to="/calendarioAcademico/calendario/create" className="reset--link button">
            + Calendario
          </Link>
        </div>
      </Fragment>
    )
  }

  renderCalendars() {
    const { calendars } = this.props

    if (calendars.length > 0) {
      return calendars.map(calendar => (
        <tr key={calendar._id}>
          <td>{calendar.semestre}</td>
          <td>
            {moment(calendar.fechaInicio)
              .utc()
              .format('l')}
          </td>
          <td>
            {moment(calendar.fechaFin)
              .utc()
              .format('l')}
          </td>
          <td>
            <Options
              handleDelete={() => this.handleDelete(calendar._id)}
              urls={this.handleUrls(calendar.semestre)}
              state={{ calendar }}
              showTitle={'Ver Programación'}
            />
          </td>
        </tr>
      ))
    }
  }
}

Calendar.propTypes = {
  match: PropTypes.object.isRequired,
  calendars: PropTypes.any.isRequired,
  fetchCalendars: PropTypes.func.isRequired,
  deleteCalendar: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, calendars } = state.calendar

  return {
    errorMessage,
    calendars,
  }
}

export default connect(
  mapStateToProps,
  { deleteCalendar, fetchCalendars },
)(Calendar)
