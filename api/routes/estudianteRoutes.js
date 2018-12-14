const express = require('express'),
  estudiante = require('../controllers/estudianteController')

const router = express.Router()

router.get('/estudiantes/asignaturas', estudiante.asignaturas)
router.get('/estudiantes/eventos', estudiante.eventos)

module.exports = router
