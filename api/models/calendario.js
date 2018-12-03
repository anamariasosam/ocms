const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Calendario = new Schema({
  semestre: String,
  fechaInicio: Date,
  fechaFin: Date,
})

module.exports = mongoose.model('Calendario', Calendario)
