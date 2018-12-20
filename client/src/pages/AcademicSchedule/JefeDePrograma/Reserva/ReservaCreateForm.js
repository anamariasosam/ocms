import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AditionalInfo from '../../../../components/AditionalInfo'
import Success from '../../../../components/Success'
import Error from '../../../../components/Error'
import { createReserva, fetchPlaces } from '../../../../actions/booking'

import 'react-selectize/themes/index.css'

class ReservaCreateForm extends Component {
  constructor(props) {
    super(props)

    this.fechaInicio = React.createRef()
    this.fechaFin = React.createRef()
    this.fechaReserva = React.createRef()
    this.lugar = React.createRef()
    this.estado = React.createRef()
    this.observaciones = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { fetchPlaces } = this.props
    fetchPlaces()
  }

  handleSubmit(e) {
    e.preventDefault()

    const fechaInicio = this.fechaInicio.current.value
    const fechaFin = this.fechaFin.current.value
    const fechaReserva = this.fechaReserva.current.value
    const lugar = this.lugar.current.value
    const estado = this.estado.current.value
    const observaciones = this.observaciones.current.value

    const { createReserva, location } = this.props
    const { _id: evento, nombre: eventoNombre } = location.state.event

    const data = {
      fechaInicio,
      fechaFin,
      fechaReserva,
      lugar,
      estado,
      observaciones,
      evento,
      eventoNombre,
    }

    createReserva(data)
  }

  render() {
    const titles = ['nombre', 'fecha', 'aforo']
    const { lugares, location } = this.props
    const { event } = location.state

    const estados = ['Pendiente', 'Reservado']
    return (
      <Fragment>
        <h2>Reserva</h2>

        <AditionalInfo data={event} titles={titles} />

        <div className="form--container">
          <h3 className="form--title">Gestionar Reserva</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="fechaInicio" className="required label">
              Fecha Inicio:
            </label>
            <input
              type="datetime-local"
              id="fechaInicio"
              className="input"
              ref={this.fechaInicio}
              required
            />

            <label htmlFor="fechaFin" className="required label">
              Fecha Fin:
            </label>
            <input
              type="datetime-local"
              id="fechaFin"
              className="input"
              ref={this.fechaFin}
              required
            />

            <label htmlFor="fechaReserva" className="required label">
              Fecha Reserva:
            </label>
            <input
              type="date"
              id="fechaReserva"
              className="input"
              ref={this.fechaReserva}
              required
            />

            <label htmlFor="grupos" className="required label">
              Lugar:
            </label>
            <select id="lugar" className="input select--input" ref={this.lugar}>
              {lugares.map(lugar => (
                <option key={lugar._id} value={lugar._id}>
                  {lugar.nombreCompleto}
                </option>
              ))}
            </select>

            <label htmlFor="estado" className="required label">
              Estado:
            </label>
            <select id="estado" className="input select--input" ref={this.estado}>
              {estados.map(estado => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>

            <label htmlFor="observaciones" className="label">
              Observaciones:
            </label>
            <textarea id="observaciones" className="input" ref={this.observaciones} />

            <div className="form--controls">
              <input type="submit" value="Guardar" className="reset--button button" />
            </div>
          </form>

          {this.renderAlert()}
        </div>
      </Fragment>
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

ReservaCreateForm.propTypes = {
  fetchPlaces: PropTypes.func.isRequired,
  createReserva: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  lugares: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, successMessage, lugares } = state.booking

  return {
    errorMessage,
    successMessage,
    lugares,
  }
}

export default connect(
  mapStateToProps,
  { createReserva, fetchPlaces },
)(ReservaCreateForm)
