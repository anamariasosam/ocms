import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import Options from '../../../../components/Options'
import AditionalInfo from '../../../../components/AditionalInfo'
import { deleteReserva, fetchReserva } from '../../../../actions/booking'
import { fetchEvent } from '../../../../actions/event'

class Reserva extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const { match, fetchEvent, fetchReserva } = this.props
    const { nombre } = match.params

    fetchEvent({ nombre })
    fetchReserva({ nombre })
  }

  handleUrls(id) {
    const { match } = this.props
    const { nombre } = match.params

    return ['/calendarioAcademico', `/calendarioAcademico/reserva/edit/${nombre}`]
  }

  handleDelete(id) {
    const confirmDelete = window.confirm('Estas seguro que deseas eliminar?')
    if (confirmDelete) {
      const { match, deleteReserva } = this.props
      const { nombre } = match.params
      const reservaId = id

      deleteReserva({
        reservaId,
        nombre,
      })
    }
  }

  render() {
    const { events } = this.props
    const titles = ['nombre', 'fecha', 'aforo']

    return (
      <Fragment>
        <h2>Reservas</h2>

        <AditionalInfo data={events} titles={titles} />

        <div className="module--container">
          <h3>Reservas</h3>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>FECHA INICIO</th>
                <th>FECHA FIN</th>
                <th>LUGAR</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>{this.renderReservas()}</tbody>
          </table>

          <Link
            to={{
              pathname: '/calendarioAcademico/reserva/create',
              state: { event: events },
            }}
            className="reset--link button"
          >
            + Reserva
          </Link>
        </div>
      </Fragment>
    )
  }

  renderReservas() {
    const { reservas, events } = this.props

    if (reservas.length > 0) {
      return reservas.map(reserva => (
        <tr key={reserva._id}>
          <td>{moment(reserva.fechaInicio).format('MMMM D YYYY, h:mm a')}</td>
          <td>{moment(reserva.fechaFin).format('MMMM D YYYY, h:mm a')}</td>
          <td>{reserva.lugar.nombreCompleto}</td>
          <td>{reserva.estado}</td>
          <td>
            <Options
              handleDelete={() => this.handleDelete(reserva._id)}
              urls={this.handleUrls(reserva._id)}
              state={{ reserva, event: events }}
              showTitle="Ver Calendario"
            />
          </td>
        </tr>
      ))
    }
  }
}

Reserva.propTypes = {
  fetchReserva: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  deleteReserva: PropTypes.func.isRequired,
  reservas: PropTypes.any.isRequired,
}

function mapStateToProps(state) {
  const { errorMessage, reservas } = state.booking
  const { events } = state.event
  return {
    errorMessage,
    reservas,
    events,
  }
}

export default connect(
  mapStateToProps,
  { deleteReserva, fetchReserva, fetchEvent },
)(Reserva)
