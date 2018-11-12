const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema(
  {
    nombre: String,
    apellido: String,
    email: String,
  },
)


module.exports = mongoose.model('Usuario', Usuario)
