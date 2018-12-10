const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

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

module.exports = mongoose.model('Calendario', Calendario)
