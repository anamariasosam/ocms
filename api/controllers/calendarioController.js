const mongoose = require('mongoose')
const Calendario = mongoose.model('Calendario')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { calendarioId } = req.query
  if (calendarioId) {
    Calendario.findOne({ nombre: calendarioId }).exec((err, calendario) => {
      utils.show(res, err, calendario)
    })
  } else {
    Calendario.find({}).exec((err, calendarios) => {
      utils.show(res, err, calendarios)
    })
  }
}

exports.create = (req, res) => {
  let { fechaInicio, fechaFin, nombre } = req.body.data
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)
  const calendario = new Calendario({
    fechaInicio,
    fechaFin,
    nombre,
  })

  calendario.save((err, calendario) => {
    utils.show(res, err, calendario)
  })
}

exports.update = (req, res) => {
  const nombreCalendario = req.body.params.calendarioId

  let { fechaInicio, fechaFin } = req.body.data
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)

  Calendario.findOneAndUpdate(
    { nombre: nombreCalendario },
    {
      fechaInicio,
      fechaFin,
    },
    { new: true },
    (err, calendario) => {
      utils.show(res, err, calendario)
    },
  )
}

exports.delete = (req, res) => {
  Calendario.findOneAndDelete({ _id: req.query.calendarioId }, (err, calendario) => {
    Calendario.find({}).exec((err, calendarios) => {
      utils.show(res, err, calendarios)
    })
  })
}
