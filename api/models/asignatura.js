const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Asignatura = new Schema({
  nombre: String,
  creditos: Number,
  nivel: Number,
})

module.exports = mongoose.model('Asignatura', Asignatura)
