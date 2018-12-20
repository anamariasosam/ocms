import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import Success from '../../../../components/Success'
import Error from '../../../../components/Error'
import { updateCalendar, fetchCalendars } from '../../../../actions/calendar'

class CalendarEditForm extends Component {
  constructor(props) {
    super(props)

    this.fechaInicio = React.createRef()
    this.fechaFin = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getCalendarValues()
  }

  getCalendarValues() {
    const { match, fetchCalendars } = this.props
    const { semestre } = match.params
    fetchCalendars({ semestre })
  }

  handleSubmit(e) {
    e.preventDefault()

    const { match, updateCalendar } = this.props
    const { semestre } = match.params
    const fechaInicio = this.fechaInicio.current.value
    const fechaFin = this.fechaFin.current.value

    const data = {
      params: {
        semestre,
      },
      data: {
        fechaInicio,
        fechaFin,
      },
    }

    updateCalendar(data)
  }

  render() {
    this.renderCalendarValues()

    return (
      <Fragment>
        <h2>Gestionar Calendario</h2>
        <div className="form--container">
          <h3 className="form--title">Editar Calendario</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="fechaInicio" className="required label">
              Fecha Inicio:
            </label>
            <input type="date" id="fechaInicio" className="input" ref={this.fechaInicio} required />

            <label htmlFor="fechaFin" className="required label">
              Fecha Fin:
            </label>
            <input type="date" id="fechaFin" className="input" ref={this.fechaFin} required />

            <div className="form--controls">
              <input type="submit" value="Guardar" className="reset--button button" />
            </div>
          </form>

          {this.renderAlert()}
        </div>
      </Fragment>
    )
  }

  renderCalendarValues() {
    const { calendars } = this.props
    const { fechaInicio, fechaFin } = calendars

    if (fechaInicio) {
      this.fechaInicio.current.value = moment(fechaInicio)
        .utc()
        .format(moment.HTML5_FMT.DATE)
    }

    if (fechaFin) {
      this.fechaFin.current.value = moment(fechaFin)
        .utc()
        .format(moment.HTML5_FMT.DATE)
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
}

CalendarEditForm.propTypes = {
  fetchCalendars: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  calendars: PropTypes.any.isRequired,
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  updateCalendar: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, successMessage, calendars } = state.calendar
  return {
    errorMessage,
    successMessage,
    calendars,
  }
}

export default connect(
  mapStateToProps,
  {
    updateCalendar,
    fetchCalendars,
  },
)(CalendarEditForm)
