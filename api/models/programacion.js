const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  EventoAcademico = require('./eventoAcademico')

const Programacion = new Schema(
  {
    nombre: String,
    fechaInicio: Date,
    fechaFin: Date,
    tipo: String,
    todosLosNiveles: {
      type: Boolean,
      default: false,
    },
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

Programacion.pre('remove', function(next) {
  EventoAcademico.remove({ programacion: this._id }).exec()
  next()
})

module.exports = mongoose.model('Programacion', Programacion)
