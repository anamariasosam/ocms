const express = require('express'),
  usuario = require('../controllers/usuarioController')

const router = express.Router()

router.get('/usuarios', usuario.show)
router.get('/usuarios/profesores', usuario.profesores)
router.get('/usuarios/estudiantes', usuario.estudiantes)
router.get('/usuarios/jefesDePrograma', usuario.jefesDePrograma)

module.exports = router
