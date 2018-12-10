const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const Reserva = new Schema({
  fechaEvento: Date,
  horaInicio: Date,
  horaFin: Date,
  fechaReserva: Date,
  estado: String,
  observaciones: String,
  lugar: { type: ObjectId, ref: 'Lugar' },
  eventoAcademico: { type: ObjectId, ref: 'EventoAcademico' },
})

module.exports = mongoose.model('Reserva', Reserva)
