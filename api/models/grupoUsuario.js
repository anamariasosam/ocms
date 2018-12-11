const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  ROL_ESTUDIANTE = require('../../constants').ROL_ESTUDIANTE,
  ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA,
  ROL_PROFESOR = require('../../constants').ROL_PROFESOR,
  ROL_ADMIN = require('../../constants').ROL_ADMIN

const GrupoUsuario = new Schema(
  {
    tipo: {
      type: String,
      enum: [ROL_ESTUDIANTE, ROL_JEFE_DE_PROGRAMA, ROL_PROFESOR, ROL_ADMIN],
      default: ROL_ESTUDIANTE,
    },
    semestre: String,
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
    collection: 'grupoUsuarios',
  },
)

module.exports = mongoose.model('GrupoUsuario', GrupoUsuario)
