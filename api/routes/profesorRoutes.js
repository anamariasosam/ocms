const express = require('express'),
  profesor = require('../controllers/profesorController')

const router = express.Router()

router.get('/profesores/asignaturas', profesor.asignaturas)
router.get('/profesores/eventos', profesor.eventos)

module.exports = router
