const mongoose = require('mongoose')
const Programacion = mongoose.model('Programacion')
const Calendario = mongoose.model('Calendario')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { programacionId, calendarioId } = req.query
  if (programacionId) {
    Programacion.findById(programacionId).exec((err, programacion) => {
      utils.show(res, err, programacion)
    })
  } else if (calendarioId) {
    Programacion.find({ calendario: calendarioId }).exec((err, programaciones) => {
      utils.show(res, err, programaciones)
    })
  }
}

exports.create = (req, res) => {
  const { calendarioId, nombre, fechaInicio, fechaFin, tipo } = req.body

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
  Programacion.findByIdAndUpdate(
    { _id: req.query.programacionId },
    req.body,
    { new: true },
    (err, programacion) => {
      utils.show(res, err, programacion)
    },
  )
}

exports.delete = (req, res) => {
  Programacion.findOneAndDelete({ _id: req.query.programacionId }, (err, programacion) => {
    utils.show(res, err, programacion)
  })
}
