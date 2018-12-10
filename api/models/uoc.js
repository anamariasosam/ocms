const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const UOC = new Schema(
  {
    nombre: String,
    descripcion: String,
    asignaturas: [
      {
        type: ObjectId,
        ref: 'Asignatura',
      },
    ],
    coordinador: {
      type: ObjectId,
      ref: 'Usuario',
    },
  },
  {
    collection: 'uoc',
  },
)

module.exports = mongoose.model('UOC', UOC)
