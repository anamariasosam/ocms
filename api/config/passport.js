const passport = require('passport'),
  Usuario = require('../models/usuario'),
  config = require('../../config/keys'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local')

const localOptions = {
  usernameField: 'correo',
}

const localLogin = new LocalStrategy(localOptions, (correo, password, done) => {
  Usuario.findOne({ correo }, (err, usuario) => {
    if (err) {
      return done(err)
    }
    if (!usuario) {
      return done(null, false, {
        error: 'Por favor intentalo de nuevo',
      })
    }

    usuario.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (!isMatch) {
        return done(null, false, {
          error: 'No se pudo verificar la contraseña. Intentalo de nuevo',
        })
      }

      return done(null, usuario)
    })
  })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.secret,
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  Usuario.findById(payload._id, (err, usuario) => {
    if (err) {
      return done(err, false)
    }

    if (usuario) {
      done(null, usuario)
    } else {
      done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)
