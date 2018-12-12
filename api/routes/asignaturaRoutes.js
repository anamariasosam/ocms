const express = require('express'),
  asignatura = require('../controllers/asignaturaController')

const router = express.Router()

router.get('/asignaturas', asignatura.show)
router.get('/asignaturas/grupos', asignatura.grupos)

module.exports = router
