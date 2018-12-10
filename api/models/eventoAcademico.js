const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const EventoAcademico = new Schema(
  {
    nombre: String,
    fecha: Date,
    aforo: Number,
    grupos: [
      {
        type: ObjectId,
        ref: 'Grupo',
      },
    ],
    encargado: { type: ObjectId, ref: 'Usuario' },
    medios: String,
    programacion: {
      type: ObjectId,
      ref: 'Programacion',
    },
    reservas: [{ type: ObjectId, ref: 'Reserva' }],
  },
  {
    collection: 'eventosAcademicos',
  },
)

module.exports = mongoose.model('EventoAcademico', EventoAcademico)
