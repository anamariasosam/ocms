const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const Reserva = new Schema({
  fechaInicio: Date,
  fechaFin: Date,
  fechaReserva: Date,
  estado: {
    default: 'Pendiente',
    type: String,
  },
  observaciones: {
    default: 'Ninguna',
    type: String,
  },
  lugar: { type: ObjectId, ref: 'Lugar' },
  evento: { type: ObjectId, ref: 'EventoAcademico' },
})

module.exports = mongoose.model('Reserva', Reserva)
