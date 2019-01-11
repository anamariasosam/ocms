const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Programacion = require('./programacion')

const Calendario = new Schema({
  semestre: String,
  fechaInicio: Date,
  fechaFin: Date,
  programacion: [
    {
      type: ObjectId,
      ref: 'Programacion',
    },
  ],
})

Calendario.pre('remove', function(next) {
  Programacion.remove({ calendario: this._id }).exec()
  next()
})

module.exports = mongoose.model('Calendario', Calendario)
