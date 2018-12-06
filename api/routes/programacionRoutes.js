const express = require('express'),
  programacion = require('../controllers/programacionController'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA

const requireAuth = passport.authenticate('jwt', { session: false })

const router = express.Router()

router.post(
  '/programaciones',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  programacion.create,
)

router.put(
  '/programaciones',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  programacion.update,
)
router.delete(
  '/programaciones',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  programacion.delete,
)

router.get('/programaciones', programacion.show)

module.exports = router
