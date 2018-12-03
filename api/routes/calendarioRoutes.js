const express = require('express'),
  calendario = require('../controllers/calendarioController'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  ROLE_JEFE_DE_PROGRAMA = require('../../constants').ROLE_JEFE_DE_PROGRAMA

const requireAuth = passport.authenticate('jwt', { session: false })

const router = express.Router()

router.post(
  '/calendarios',
  requireAuth,
  autenticacion.roleAuthorization(ROLE_JEFE_DE_PROGRAMA),
  calendario.create,
)
router.get('/calendarios', calendario.show)
router.put('/calendarios', calendario.update)
router.delete('/calendarios', calendario.delete)

module.exports = router
