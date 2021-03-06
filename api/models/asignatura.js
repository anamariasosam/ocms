const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const Asignatura = new Schema({
  nombre: String,
  creditos: Number,
  nivel: Number,
  grupos: [
    {
      type: ObjectId,
      ref: 'Grupo',
    },
  ],
  uoc: {
    type: ObjectId,
    ref: 'UOC',
  },
  troncoComun: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Asignatura', Asignatura)
