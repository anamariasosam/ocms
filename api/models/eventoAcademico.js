const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const EventoAcademico = new Schema(
  {
    nombre: { type: String, unique: true, lowercase: true },
    fechaInicio: Date,
    fechaFin: Date,
    aforo: {
      type: Number,
      default: 0,
    },
    grupo: {
      type: ObjectId,
      ref: 'Grupo',
    },
    encargado: { type: ObjectId, ref: 'Usuario' },
    medios: String,
    programacion: {
      type: ObjectId,
      ref: 'Programacion',
    },
    lugar: { type: ObjectId, ref: 'Lugar' },
  },
  {
    collection: 'eventosAcademicos',
  },
)

module.exports = mongoose.model('EventoAcademico', EventoAcademico)
