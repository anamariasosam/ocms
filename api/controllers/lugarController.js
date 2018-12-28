const mongoose = require('mongoose'),
  Lugar = mongoose.model('Lugar'),
  utils = require('../handlers/utils')

exports.show = (req, res) => {
  Lugar.find({})
    .sort('nombre')
    .exec((err, lugares) => {
      utils.show(res, err, lugares)
    })
}
