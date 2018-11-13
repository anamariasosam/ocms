const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Calendario = new Schema({
  nombre: String,
  fechaInicio: Date,
  fechaFin: Date,
})

module.exports = mongoose.model('Calendario', Calendario)
