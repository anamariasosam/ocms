const express = require('express'),
  calendario = require('../controllers/calendarioController'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA

const requireAuth = passport.authenticate('jwt', { session: false })

const router = express.Router()

router.post(
  '/calendarios',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  calendario.create,
)
router.put(
  '/calendarios',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  calendario.update,
)
router.delete(
  '/calendarios',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  calendario.delete,
)
router.get('/calendarios', calendario.show)

module.exports = router
