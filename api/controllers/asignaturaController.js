const mongoose = require('mongoose'),
  Asignatura = mongoose.model('Asignatura'),
  utils = require('../handlers/utils')

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
