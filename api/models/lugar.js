const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Lugar = new Schema(
  {
    numero: String,
    bloque: Number,
    capacidad: Number,
    observaciones: {
      default: 'Ninguna',
      type: String,
    },
  },
  {
    collection: 'lugares',
    toJSON: { virtuals: true },
  },
)

Lugar.virtual('nombre').get(function() {
  return `${this.bloque}-${this.numero}`
})

module.exports = mongoose.model('Lugar', Lugar)
