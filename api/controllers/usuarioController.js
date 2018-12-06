const mongoose = require('mongoose'),
  Usuario = mongoose.model('Usuario'),
  utils = require('../handlers/utils'),
  ROL_PROFESOR = require('../../constants').ROL_PROFESOR
ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA
ROL_ESTUDIANTE = require('../../constants').ROL_ESTUDIANTE

exports.show = (req, res) => {
  const { usuarioId } = req.query
  if (usuarioId) {
    Usuario.findById(usuarioId).exec((err, usuario) => {
      utils.show(res, err, usuario)
    })
  } else {
    Usuario.find({})
      .sort('nombre')
      .exec((err, usuarios) => {
        utils.show(res, err, usuarios)
      })
  }
}

exports.profesores = (req, res) => {
  Usuario.find({ rol: ROL_PROFESOR })
    .sort('nombre')
    .exec((err, usuarios) => {
      console.log(usuarios)

      utils.show(res, err, usuarios)
    })
}

exports.estudiantes = (req, res) => {
  Usuario.find({ rol: ROL_ESTUDIANTE })
    .sort('nombre')
    .exec((err, usuarios) => {
      console.log(usuarios)

      utils.show(res, err, usuarios)
    })
}

exports.jefesDePrograma = (req, res) => {
  Usuario.find({ rol: ROL_JEFE_DE_PROGRAMA })
    .sort('nombre')
    .exec((err, usuarios) => {
      console.log(usuarios)

      utils.show(res, err, usuarios)
    })
}
