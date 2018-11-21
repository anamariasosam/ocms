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
  console.log(req.body.data)
  const { calendarioId, nombre, fechaInicio, fechaFin, tipo } = req.body.data

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
  const data = req.body.data

  Programacion.findOneAndUpdate({ nombre: nombre }, data, { new: true }, (err, programacion) => {
    utils.show(res, err, programacion)
  })
}

exports.delete = (req, res) => {
  const { calendarioId, programacionId } = req.query
  Programacion.findOneAndDelete({ _id: programacionId }, (err, calendario) => {
    Programacion.find({ calendario: calendarioId }).exec((err, programaciones) => {
      utils.show(res, err, programaciones)
    })
  })
}
