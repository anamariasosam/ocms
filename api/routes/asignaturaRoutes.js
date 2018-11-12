const express = require('express')
const asignatura = require('../controllers/asignaturaController')

const router = express.Router()

router.get('/asignaturas', asignatura.show)

module.exports = router
