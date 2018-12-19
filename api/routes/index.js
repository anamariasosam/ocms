const express = require('express'),
  calendarioRoutes = require('./calendarioRoutes'),
  programacionRoutes = require('./programacionRoutes'),
  grupoRoutes = require('./grupoRoutes'),
  asignaturaRoutes = require('./asignaturaRoutes'),
  usuarioRoutes = require('./usuarioRoutes'),
  eventoAcademicoRoutes = require('./eventoAcademicoRoutes'),
  autenticacionRoutes = require('./autenticacionRoutes'),
  tipoProgramacionRoutes = require('./tipoProgramacionRoutes'),
  estudianteRoutes = require('./estudianteRoutes'),
  profesorRoutes = require('./profesorRoutes'),
  lugarRoutes = require('./lugarRoutes'),
  reservaRoutes = require('./reservaRoutes')

const router = express.Router()

router.use('/api', calendarioRoutes)
router.use('/api', programacionRoutes)
router.use('/api', grupoRoutes)
router.use('/api', asignaturaRoutes)
router.use('/api', usuarioRoutes)
router.use('/api', eventoAcademicoRoutes)
router.use('/api', autenticacionRoutes)
router.use('/api', tipoProgramacionRoutes)
router.use('/api', estudianteRoutes)
router.use('/api', profesorRoutes)
router.use('/api', lugarRoutes)
router.use('/api', reservaRoutes)

module.exports = router
