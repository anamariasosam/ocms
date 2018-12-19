const express = require('express'),
  reserva = require('../controllers/reservaController'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA

const requireAuth = passport.authenticate('jwt', { session: false })
const router = express.Router()

router.post(
  '/reservas',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  reserva.create,
)
router.put(
  '/reservas',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  reserva.update,
)
router.delete(
  '/reservas',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  reserva.delete,
)
router.get('/reservas', reserva.show)

module.exports = router
