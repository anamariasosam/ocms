const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const Lugar = new Schema(
  {
    nombre: String,
    numero: Number,
    bloque: Number,
    capacidad: Number,
    observaciones: String,
    recursos: [{ type: ObjectId, ref: 'Recurso' }],
    reservas: [{ type: ObjectId, ref: 'Reserva' }],
  },
  {
    collection: 'lugares',
  },
)

module.exports = mongoose.model('Lugar', Lugar)
