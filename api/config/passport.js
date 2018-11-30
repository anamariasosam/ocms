// Importing Passport, strategies, and keys
const passport = require('passport'),
  Usuario = require('../models/usuario'),
  keys = require('../../config/keys')
;(JwtStrategy = require('passport-jwt').Strategy),
  (ExtractJwt = require('passport-jwt').ExtractJwt),
  (LocalStrategy = require('passport-local'))

const localOptions = { usernameField: 'email' }

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  // Telling Passport where to find the secret
  secretOrKey: keys.secret,
}

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  Usuario.findOne({ email }, function(err, usuario) {
    if (err) {
      return done(err)
    }
    if (usuario) {
      usuario.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err)
        }
        if (!isMatch) {
          return done(null, false, {
            error: 'Your login details could not be verified. Please try again.',
          })
        }

        return done(null, usuario)
      })
    } else {
      done(null, false)
    }
  })
})

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false)
    }

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)
