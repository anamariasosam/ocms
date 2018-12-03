const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TipoProgramacion = new Schema({
  nombre: String,
})

module.exports = mongoose.model('TipoProgramacion', TipoProgramacion)
