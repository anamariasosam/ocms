const express = require('express'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport')

const requireLogin = passport.authenticate('local', { session: false })

const router = express.Router(),
  authRoutes = express.Router()

router.use('/auth', authRoutes)

// Registration route
authRoutes.post('/register', autenticacion.register)

// Login route
authRoutes.post('/login', requireLogin, autenticacion.login)

module.exports = router
