const express = require('express')
const eventoAcademico = require('../controllers/eventoAcademicoController')

const router = express.Router()

router.post('/eventosAcademicos', eventoAcademico.create)
router.get('/eventosAcademicos', eventoAcademico.show)
router.put('/eventosAcademicos', eventoAcademico.update)
router.delete('/eventosAcademicos', eventoAcademico.delete)

module.exports = router
