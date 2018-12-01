const express = require('express')

const calendarioRoutes = require('./calendarioRoutes')
const programacionRoutes = require('./programacionRoutes')
const grupoRoutes = require('./grupoRoutes')
const asignaturaRoutes = require('./asignaturaRoutes')
const usuarioRoutes = require('./usuarioRoutes')
const eventoAcademicoRoutes = require('./eventoAcademicoRoutes')
const autenticacionRoutes = require('./autenticacionRoutes')
const tipoProgramacionRoutes = require('./tipoProgramacionRoutes')

const router = express.Router()

router.use('/api', calendarioRoutes)
router.use('/api', programacionRoutes)
router.use('/api', grupoRoutes)
router.use('/api', asignaturaRoutes)
router.use('/api', usuarioRoutes)
router.use('/api', eventoAcademicoRoutes)
router.use('/api', autenticacionRoutes)
router.use('/api', tipoProgramacionRoutes)

module.exports = router
