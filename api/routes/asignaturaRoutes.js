const express = require('express'),
  asignatura = require('../controllers/asignaturaController')

const router = express.Router()

router.get('/asignaturas', asignatura.show)
router.get('/asignaturas/grupos', asignatura.grupos)
router.get('/asignaturas/eventos', asignatura.eventos)

module.exports = router
