const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs'),
  ROL_ESTUDIANTE = require('../../constants').ROL_ESTUDIANTE,
  ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA,
  ROL_PROFESOR = require('../../constants').ROL_PROFESOR,
  ROL_ADMIN = require('../../constants').ROL_ADMIN

const Usuario = new Schema(
  {
    nombre: String,
    apellido: String,
    correo: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    programa: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: [ROL_ESTUDIANTE, ROL_JEFE_DE_PROGRAMA, ROL_PROFESOR, ROL_ADMIN],
      default: ROL_ESTUDIANTE,
    },
  },
  {
    toJSON: { virtuals: true },
  },
)

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

Usuario.virtual('nombreCompleto').get(function() {
  return this.nombre + ' ' + this.apellido
})

module.exports = mongoose.model('Usuario', Usuario)
