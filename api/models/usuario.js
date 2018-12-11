const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  bcrypt = require('bcrypt-nodejs'),
  ROL_ESTUDIANTE = require('../../constants').ROL_ESTUDIANTE,
  ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA,
  ROL_PROFESOR = require('../../constants').ROL_PROFESOR,
  ROL_ADMIN = require('../../constants').ROL_ADMIN

const Usuario = new Schema({
  nombre: String,
  correo: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },
  rol: {
    type: String,
    enum: [ROL_ESTUDIANTE, ROL_JEFE_DE_PROGRAMA, ROL_PROFESOR, ROL_ADMIN],
    default: ROL_ESTUDIANTE,
  },
  uoc: [
    {
      type: ObjectId,
      ref: 'UOC',
    },
  ],
  eventos: [
    {
      type: ObjectId,
      ref: 'EventoAcademico',
      required: true,
    },
  ],
  grupos: [
    {
      type: ObjectId,
      ref: 'GrupoUsuario',
      required: true,
    },
  ],
})

Usuario.pre('save', function(next) {
  const usuario = this,
    SALT_FACTOR = 5

  if (!usuario.isModified('password')) return next()

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(usuario.password, salt, null, function(err, hash) {
      if (err) return next(err)
      usuario.password = hash
      next()
    })
  })
})

Usuario.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err)
    }

    cb(null, isMatch)
  })
}

module.exports = mongoose.model('Usuario', Usuario)
