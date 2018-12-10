const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const Programacion = new Schema(
  {
    nombre: String,
    fechaInicio: Date,
    fechaFin: Date,
    tipo: String,
    calendario: {
      type: ObjectId,
      ref: 'Calendario',
    },
    eventos: [
      {
        type: ObjectId,
        ref: 'EventoAcademico',
      },
    ],
  },
  {
    collection: 'programaciones',
  },
)

module.exports = mongoose.model('Programacion', Programacion)
