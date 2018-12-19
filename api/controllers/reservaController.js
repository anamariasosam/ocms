const mongoose = require('mongoose'),
  EventoAcademico = mongoose.model('EventoAcademico'),
  Reserva = mongoose.model('Reserva'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { nombre, reservaId } = req.query
  if (nombre) {
    EventoAcademico.findOne({ nombre }).exec((err, evento) => {
      const eventoId = evento._id
      Reserva.find({ evento: eventoId })
        .sort('fechaInicio')
        .populate('lugar')
        .populate('evento')
        .exec((err, reservas) => {
          utils.show(res, err, reservas)
        })
    })
  } else {
    Reserva.findById(reservaId)
      .sort('fechaInicio')
      .populate('lugar')
      .populate('evento')
      .exec((err, reservas) => {
        utils.show(res, err, reservas)
      })
  }
}

exports.create = async (req, res) => {
  const { fechaInicio, fechaFin, fechaReserva, lugar, estado, observaciones, evento } = req.body

  const reserva = new Reserva({
    fechaInicio,
    fechaFin,
    fechaReserva,
    lugar,
    estado,
    observaciones,
    evento,
  })

  reserva.save((err, reserva) => {
    utils.show(res, err, reserva)
  })
}

exports.update = (req, res) => {
  const { _id } = req.body.params

  const {
    fechaInicio,
    fechaFin,
    fechaReserva,
    lugar,
    estado,
    observaciones,
    evento,
  } = req.body.data

  Reserva.findOneAndUpdate(
    { _id },
    {
      fechaInicio,
      fechaFin,
      fechaReserva,
      lugar,
      estado,
      observaciones,
      evento,
    },
    { new: true },
    (err, reserva) => {
      utils.show(res, err, reserva)
    },
  )
}

exports.delete = (req, res) => {
  const { reservaId, nombre } = req.query
  Reserva.findOneAndDelete({ _id: reservaId }, (err, reserva) => {
    EventoAcademico.findOne({ nombre }).exec((err, evento) => {
      const eventoId = evento._id
      Reserva.find({ evento: eventoId })
        .sort('fechaInicio')
        .populate('lugar')
        .populate('evento')
        .exec((err, reservas) => {
          utils.show(res, err, reservas)
        })
    })
  })
}
