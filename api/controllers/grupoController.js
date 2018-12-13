const mongoose = require('mongoose'),
  Grupo = mongoose.model('Grupo'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  const { grupoId } = req.query
  if (grupoId) {
    Grupo.findById(grupoId).exec((err, grupo) => {
      utils.show(res, err, grupo)
    })
  } else {
    Grupo.find({})
      .populate('asignatura', 'nombre')
      .exec((err, grupos) => {
        utils.show(res, err, grupos)
      })
  }
}
