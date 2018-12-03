const express = require('express'),
  asignatura = require('../controllers/asignaturaController')

const router = express.Router()

router.get('/asignaturas', asignatura.show)

module.exports = router
