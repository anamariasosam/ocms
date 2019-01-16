import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Calendar from 'react-big-calendar'
import moment from 'moment'
import cookie from 'react-cookies'
import swal from '@sweetalert/with-react'
import { fetchStudentEvents } from '../../actions/student'
import { fetchTeacherEvents } from '../../actions/teacher'
import { fetchEvent } from '../../actions/event'
import CalendarLabels from '../../components/CalendarLabels'
import EventAlert from '../../components/EventAlert'

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
    const { events, calendarDate } = this.props

    if (events.length > 0) {
      const labels = new Set()

      const bigCalendarEvents = events.map(event => {
        labels.add(event.programacion.tipo)
        return {
          start: moment(event.fechaInicio).toDate(),
          end: moment(event.fechaFin).toDate(),
          title: (event.grupo && event.grupo.asignatura.nombre) || event.nombre,
          tipo: event.programacion.tipo,
          lugar: event.lugar && event.lugar.nombre,
        }
      })

      return (
        <Fragment>
          {labels && <CalendarLabels labels={Array.from(labels)} />}
          <Calendar
            localizer={localizer}
            defaultView="month"
            views={['month', 'agenda', 'day']}
            events={bigCalendarEvents}
            style={{ height: '100vh' }}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment(calendarDate).toDate()}
            selectable
            popup
            popupOffset={{ x: 30, y: 20 }}
            onSelectEvent={e =>
              swal({
                content: <EventAlert event={e} />,
              })
            }
            eventPropGetter={event => ({
              className: `event-block event--${event.tipo.replace(/\s+/g, '-').toLowerCase()}`,
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
