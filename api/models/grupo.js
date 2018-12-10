const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const Grupo = new Schema({
  nombre: String,
  asignatura: {
    type: ObjectId,
    ref: 'Asignatura',
  },
  usuarios: [
    {
      type: ObjectId,
      ref: 'GrupoUsuario',
    },
  ],
})

module.exports = mongoose.model('Grupo', Grupo)
