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
router.put(
  '/eventosAcademicos',
  requireAuth,
  autenticacion.roleAuthorization(ROLE_JEFE_DE_PROGRAMA),
  eventoAcademico.update,
)
router.delete(
  '/eventosAcademicos',
  requireAuth,
  autenticacion.roleAuthorization(ROLE_JEFE_DE_PROGRAMA),
  eventoAcademico.delete,
)
router.get('/eventosAcademicos', eventoAcademico.show)
module.exports = router
