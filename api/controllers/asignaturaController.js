const mongoose = require('mongoose'),
  Asignatura = mongoose.model('Asignatura'),
  Grupo = mongoose.model('Grupo'),
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

exports.grupos = (req, res) => {
  const { asignaturaId } = req.query
  Grupo.find({ asignatura: asignaturaId }).exec((err, grupos) => {
    utils.show(res, err, grupos)
  })
}
