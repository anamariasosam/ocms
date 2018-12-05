const express = require('express'),
  eventoAcademico = require('../controllers/eventoAcademicoController'),
  autenticacion = require('../controllers/autenticacionController'),
  passport = require('passport'),
  passportService = require('../config/passport'),
  ROLE_JEFE_DE_PROGRAMA = require('../../constants').ROLE_JEFE_DE_PROGRAMA

const requireAuth = passport.authenticate('jwt', { session: false })
const router = express.Router()

router.post(
  '/eventosAcademicos',
  requireAuth,
  autenticacion.roleAuthorization(ROLE_JEFE_DE_PROGRAMA),
  eventoAcademico.create,
)
router.get('/eventosAcademicos', eventoAcademico.show)
router.put(
  '/eventosAcademicos',
  requireAuth,
  autenticacion.roleAuthorization(ROLE_JEFE_DE_PROGRAMA),
  eventoAcademico.update,
)
router.delete('/eventosAcademicos', eventoAcademico.delete)

module.exports = router
