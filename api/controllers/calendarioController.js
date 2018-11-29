const mongoose = require('mongoose')
const Calendario = mongoose.model('Calendario')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { semestre } = req.query
  if (semestre) {
    Calendario.findOne({ semestre }).exec((err, calendario) => {
      utils.show(res, err, calendario)
    })
  } else {
    Calendario.find({})
      .sort('semestre')
      .exec((err, calendarios) => {
        utils.show(res, err, calendarios)
      })
  }
}

exports.create = (req, res) => {
  let { fechaInicio, fechaFin, semestre } = req.body.data
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)
  const calendario = new Calendario({
    fechaInicio,
    fechaFin,
    semestre,
  })

  calendario.save((err, calendario) => {
    utils.show(res, err, calendario)
  })
}

exports.update = (req, res) => {
  const semestre = req.body.params.semestre

  let { fechaInicio, fechaFin } = req.body.data
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)

  Calendario.findOneAndUpdate(
    { semestre },
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
