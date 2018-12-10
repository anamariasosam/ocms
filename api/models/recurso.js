const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Recurso = new Schema({
  nombre: String,
  descripcion: String,
  cantidad: Number,
  observaciones: String,
})

module.exports = mongoose.model('Recurso', Recurso)
