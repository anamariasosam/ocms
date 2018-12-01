const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')
const utils = require('../handlers/utils')

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
