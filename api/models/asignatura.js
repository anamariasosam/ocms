const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Asignatura = new Schema({
  nombre: String,
  creditos: Number,
})

module.exports = mongoose.model('Asignatura', Asignatura)
