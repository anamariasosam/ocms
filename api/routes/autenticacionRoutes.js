const express = require('express'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport')

const requireLogin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })

const router = express.Router(),
  authRoutes = express.Router()

router.use('/auth', authRoutes)

authRoutes.post('/register', autenticacion.register)

authRoutes.post('/login', requireLogin, autenticacion.login)

authRoutes.put('/editarPerfil', requireAuth, autenticacion.update)

module.exports = router
