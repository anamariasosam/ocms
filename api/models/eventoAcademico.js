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
    },
  },
  {
    collection: 'eventosAcademicos',
    toJSON: { virtuals: true },
  },
)

EventoAcademico.virtual('hora').get(function() {
  const fecha = this.fecha
  const hora = fecha.getHours()
  const minutos = fecha.getMinutes()
  const minutosFormato = minutos >= 10 ? minutos : `0${minutos}`
  return `${hora}:${minutosFormato}`
})

module.exports = mongoose.model('EventoAcademico', EventoAcademico)
