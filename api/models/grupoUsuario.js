const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

const GrupoUsuario = new Schema(
  {
    fechaInicio: Date,
    fechaFin: Date,
    tipo: String,
    usuario: {
      type: ObjectId,
      ref: 'Usuario',
    },
    grupo: {
      type: ObjectId,
      ref: 'Grupo',
    },
  },
  {
    collection: 'grupo_usuarios',
  },
)

module.exports = mongoose.model('GrupoUsuario', GrupoUsuario)
