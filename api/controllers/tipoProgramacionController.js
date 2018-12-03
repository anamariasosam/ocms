const mongoose = require('mongoose'),
  Tipo = mongoose.model('TipoProgramacion'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { tipoId } = req.query
  if (tipoId) {
    Tipo.findById(tipoId).exec((err, tipo) => {
      utils.show(res, err, tipo)
    })
  } else {
    Tipo.find({})
      .sort('nombre')
      .exec((err, tipos) => {
        utils.show(res, err, tipos)
      })
  }
}
