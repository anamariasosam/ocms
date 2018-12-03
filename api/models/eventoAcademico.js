const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const EventoAcademico = new Schema(
  {
    nombre: String,
    fecha: Date,
    aforo: Number,
    asignatura: String,
    grupos: Array,
    encargado: String,
    medios: String,
    programacion: {
      type: ObjectId,
      ref: 'Programacion',
      required: true,
    },
  },
  {
    collection: 'eventosAcademicos',
  },
)

module.exports = mongoose.model('EventoAcademico', EventoAcademico)
