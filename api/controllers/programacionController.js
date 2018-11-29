const mongoose = require('mongoose')
const Programacion = mongoose.model('Programacion')
const Calendario = mongoose.model('Calendario')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { programacionId, calendarioId } = req.query
  if (programacionId) {
    Programacion.findOne({ nombre: programacionId }).exec((err, programacion) => {
      utils.show(res, err, programacion)
    })
  } else if (calendarioId) {
    Programacion.find({ calendario: calendarioId }).exec((err, programaciones) => {
      utils.show(res, err, programaciones)
    })
  }
}

exports.create = (req, res) => {
  const { calendarioId, nombre, tipo } = req.body.data
  let { fechaInicio, fechaFin } = req.body.data
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)

  const calendario = new Calendario({ _id: calendarioId })

  const programacion = new Programacion({
    nombre,
    fechaInicio,
    fechaFin,
    tipo,
    calendario,
  })

  programacion.save((err, programacion) => {
    utils.show(res, err, programacion)
  })
}

exports.update = (req, res) => {
  const nombre = req.body.params.programacionId
  const { tipo } = req.body.data
  let { fechaInicio, fechaFin } = req.body.data
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)

  Programacion.findOneAndUpdate(
    { nombre: nombre },
    {
      fechaInicio,
      fechaFin,
      tipo,
    },
    { new: true },
    (err, programacion) => {
      utils.show(res, err, programacion)
    },
  )
}

exports.delete = (req, res) => {
  const { calendarioId, programacionId } = req.query
  Programacion.findOneAndDelete({ _id: programacionId }, (err, calendario) => {
    Programacion.find({ calendario: calendarioId }).exec((err, programaciones) => {
      utils.show(res, err, programaciones)
    })
  })
}
