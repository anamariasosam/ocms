import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Success from '../../../../components/Success'
import Error from '../../../../components/Error'
import AditionalInfo from '../../../../components/AditionalInfo'
import { createAgenda, fetchEventTypes } from '../../../../actions/agenda'

class AgendaCreateForm extends Component {
  constructor(props) {
    super(props)

    this.fechaInicio = React.createRef()
    this.fechaFin = React.createRef()
    this.tipo = React.createRef()
    this.discriminadaPorNivel = React.createRef()
    this.todosLosNiveles = React.createRef()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { fetchEventTypes } = this.props
    fetchEventTypes()
  }

  handleSubmit(e) {
    e.preventDefault()
    const { location, createAgenda } = this.props

    const fechaInicio = this.fechaInicio.current.value
    const fechaFin = this.fechaFin.current.value
    const tipo = this.tipo.current.value
    const discriminadaPorNivel = this.discriminadaPorNivel.current.checked

    const { _id: calendarioId, semestre: calendarioSemestre } = location.state.calendar

    const data = {
      fechaInicio,
      fechaFin,
      tipo,
      calendarioId,
      calendarioSemestre,
      discriminadaPorNivel,
    }

    createAgenda(data)
  }

  render() {
    const { tipoProgramacion, location } = this.props
    const titles = ['semestre', 'fecha Inicio', 'fecha Fin']
    const { calendar } = location.state
    const { fechaInicio, fechaFin } = calendar
    return (
      <Fragment>
        <h2>Gestionar Programación</h2>

        <AditionalInfo data={calendar} titles={titles} />

        <div className="form--container">
          <h3 className="form--title">Crear Programación</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="tipo" className="required label">
              Tipo de Evento:
            </label>
            <select id="tipo" ref={this.tipo} className="input select--input">
              {tipoProgramacion.map(tipo => (
                <option key={tipo._id}>{tipo.nombre}</option>
              ))}
            </select>
            <label htmlFor="fechaInicio" className="required label">
              Fecha Inicio:
            </label>
            <input
              type="date"
              id="fechaInicio"
              className="input"
              ref={this.fechaInicio}
              required
              min={fechaInicio.split('T')[0]}
              max={fechaFin.split('T')[0]}
            />
            <label htmlFor="fechaFin" className="required label">
              Fecha Fin:
            </label>
            <input
              type="date"
              id="fechaFin"
              className="input"
              ref={this.fechaFin}
              required
              min={fechaInicio.split('T')[0]}
              max={fechaFin.split('T')[0]}
            />
            <label className="label">¿Esta es una programación discriminada por nivel?:</label>
            <input
              type="radio"
              name="discriminadaPorNivel"
              ref={this.discriminadaPorNivel}
              defaultChecked
            />{' '}
            Sí
            <input type="radio" name="discriminadaPorNivel" ref={this.todosLosNiveles} /> No
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

AgendaCreateForm.propTypes = {
  location: PropTypes.object.isRequired,
  fetchEventTypes: PropTypes.func.isRequired,
  createAgenda: PropTypes.func.isRequired,
  tipoProgramacion: PropTypes.array.isRequired,
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, successMessage, tipoProgramacion } = state.agenda

  return {
    errorMessage,
    successMessage,
    tipoProgramacion,
  }
}

export default connect(
  mapStateToProps,
  { createAgenda, fetchEventTypes },
)(AgendaCreateForm)
