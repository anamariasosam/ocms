const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema(
  {
    nombre: String,
    apellido: String,
    email: String,
  },
  {
    toJSON: { virtuals: true },
  },
)

Usuario.virtual('fullName').get(function () {
  return this.nombre + ' ' + this.apellido
})

module.exports = mongoose.model('Usuario', Usuario)
