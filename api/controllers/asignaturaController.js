const mongoose = require('mongoose')
const Asignatura = mongoose.model('Asignatura')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { asignaturaId } = req.query
  if (asignaturaId) {
    Asignatura.findById(asignaturaId).exec((err, asignatura) => {
      utils.show(res, err, asignatura)
    })
  } else {
    Asignatura.find({})
      .sort('nombre')
      .exec((err, asignaturas) => {
        utils.show(res, err, asignaturas)
      })
  }
}
