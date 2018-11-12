const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const EventoAcademico = new Schema(
  {
    nombre: String,
    fecha: Date,
    aforo: Number,
    asignatura: String,
    grupos: Array,
    encargado: String,
    programacion: {
      type: ObjectId,
      ref: 'Programacion',
      required: true,
    }
  },
  {
    collection: 'eventosAcademicos',
  }
)


module.exports = mongoose.model('EventoAcademico', EventoAcademico)
