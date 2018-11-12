const mongoose = require('mongoose')
const Calendario = mongoose.model('Calendario')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { calendarioId } = req.query
  if (calendarioId) {
    Calendario
      .findById(calendarioId)
      .exec((err, calendario) => {
        utils.show(res, err, calendario)
      })
  } else {
    Calendario
      .find({})
      .exec((err, calendarios) => {
        utils.show(res, err, calendarios)
      })
  }
  
}

exports.create = (req, res) => {
  const { 
    fechaInicio,
    fechaFin,
    nombre,
  } = req.body

  const calendario = new Calendario({ 
    fechaInicio,
    fechaFin, 
    nombre
  })

  calendario.save((err, calendario) => {
    utils.show(res, err, calendario)
  })
}

exports.update = (req, res) => {
  Calendario.findByIdAndUpdate(
    { _id: req.query.calendarioId }, 
    req.body, 
    { new: true }, 
    (
      err,
      calendario,
    ) => {
      utils.show(res, err, calendario)
    }
  )
}

exports.delete = (req, res) => {
  Calendario
    .findOneAndRemove({ _id: req.query.calendarioId }, 
    (
      err,
      calendario,
    ) => {
      utils.show(res, err, calendario)
    });
}
