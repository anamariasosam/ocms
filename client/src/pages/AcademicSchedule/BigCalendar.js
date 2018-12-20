import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Calendar from 'react-big-calendar'
import moment from 'moment'
import cookie from 'react-cookies'
import swal from 'sweetalert'
import { fetchStudentEvents } from '../../actions/student'
import { fetchTeacherEvents } from '../../actions/teacher'
import { fetchEvent } from '../../actions/event'
import CalendarLabels from '../../components/CalendarLabels'
import SemestreInput from '../../components/SelectInput'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = Calendar.momentLocalizer(moment)

class BigCalendar extends Component {
  componentDidMount() {
    this.getEvents()
  }

  getEvents() {
    const { fetchStudentEvents, fetchEvent, fetchTeacherEvents } = this.props

    const { rol, _id: usuario } = cookie.load('user') || ''
    const params = { usuario }

    switch (rol) {
      case 'Jefe de Programa':
        fetchEvent()
        break
      case 'Estudiante':
        fetchStudentEvents(params)
        break
      case 'Profesor':
        fetchTeacherEvents(params)
        break
      default:
        return '/login'
    }
  }

  render() {
    return (
      <Fragment>
        <div className="module--container">{this.renderCalendar()}</div>
      </Fragment>
    )
  }

  renderCalendar() {
    const { events } = this.props

    if (events.length > 0) {
      const labels = new Set()

      const bigCalendarEvents = events.map(event => {
        labels.add(event.programacion.tipo)
        return {
          start: moment(event.fecha).toDate(),
          end: moment(event.fecha)
            .add(2, 'hours')
            .toDate(),
          title: event.grupos.map(g => g.asignatura.nombre).join(', '),
          category: event.programacion.tipo,
        }
      })

      return (
        <Fragment>
          <CalendarLabels labels={Array.from(labels)} />
          <Calendar
            localizer={localizer}
            defaultView="month"
            views={['month', 'agenda', 'day']}
            events={bigCalendarEvents}
            style={{ height: '100vh' }}
            startAccessor="start"
            endAccessor="end"
            popup
            onSelectEvent={e =>
              swal({
                title: e.category,
                text: e.title,
              })
            }
            eventPropGetter={event => ({
              className: 'event-block event--' + event.category.replace(/\s+/g, '-').toLowerCase(),
            })}
          />
        </Fragment>
      )
    }

    return (
      <div className="module--container center">
        <img src={require('../../images/loading.svg')} alt="loading" />
      </div>
    )
  }
}

BigCalendar.propTypes = {
  fetchStudentEvents: PropTypes.func.isRequired,
  programacionNombre: PropTypes.string,
}

function getState(state) {
  const { rol } = cookie.load('user') || ''

  switch (rol) {
    case 'Jefe de Programa':
      return state.event
    case 'Estudiante':
      return state.student
    case 'Profesor':
      return state.teacher
    default:
      return {}
  }
}

function mapStateToProps(state) {
  const { events } = getState(state)

  return {
    events,
  }
}

export default connect(
  mapStateToProps,
  { fetchStudentEvents, fetchEvent, fetchTeacherEvents },
)(BigCalendar)
