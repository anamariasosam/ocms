const mongoose = require('mongoose'),
  Calendario = mongoose.model('Calendario'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { semestre } = req.query
  if (semestre) {
    Calendario.findOne({ semestre }).exec((err, calendario) => {
      utils.show(res, err, calendario)
    })
  } else {
    Calendario.find({})
      .populate('programacion')
      .sort('semestre')
      .exec((err, calendarios) => {
        utils.show(res, err, calendarios)
      })
  }
}

exports.create = (req, res) => {
  const { fechaInicio, fechaFin, semestre } = req.body

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
  const { fechaInicio, fechaFin } = req.body.data

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
