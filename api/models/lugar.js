const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const Lugar = new Schema(
  {
    nombre: String,
    numero: Number,
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

Lugar.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.bloque}-${this.numero}`
})

module.exports = mongoose.model('Lugar', Lugar)
