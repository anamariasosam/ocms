const express = require('express'),
  programacion = require('../controllers/programacionController'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  ROLE_JEFE_DE_PROGRAMA = require('../../constants').ROLE_JEFE_DE_PROGRAMA

const requireAuth = passport.authenticate('jwt', { session: false })

const router = express.Router()

router.post(
  '/programaciones',
  requireAuth,
  autenticacion.roleAuthorization(ROLE_JEFE_DE_PROGRAMA),
  programacion.create,
)
router.get('/programaciones', programacion.show)
router.put(
  '/programaciones',
  requireAuth,
  autenticacion.roleAuthorization(ROLE_JEFE_DE_PROGRAMA),
  programacion.update,
)
router.delete('/programaciones', programacion.delete)

module.exports = router
