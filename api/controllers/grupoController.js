const mongoose = require('mongoose')
const Grupo = mongoose.model('Grupo')
const utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { grupoId } = req.query
  if (grupoId) {
    Grupo.findById(grupoId).exec((err, grupo) => {
      utils.show(res, err, grupo)
    })
  } else {
    Grupo.find({}).exec((err, grupos) => {
      utils.show(res, err, grupos)
    })
  }
}
