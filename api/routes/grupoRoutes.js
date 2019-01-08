const express = require('express'),
  grupo = require('../controllers/grupoController'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  ROL_JEFE_DE_PROGRAMA = require('../../constants').ROL_JEFE_DE_PROGRAMA

const requireAuth = passport.authenticate('jwt', { session: false })

const router = express.Router()

router.get('/grupos', grupo.show)
router.get('/asignatura/grupos', grupo.eventos)
router.put(
  '/asignatura/grupos',
  requireAuth,
  autenticacion.roleAuthorization(ROL_JEFE_DE_PROGRAMA),
  grupo.updateEventos,
)

module.exports = router
