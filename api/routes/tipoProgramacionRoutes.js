const express = require('express'),
  tipoProgramacion = require('../controllers/tipoProgramacionController')

const router = express.Router()

router.get('/tipoProgramaciones', tipoProgramacion.show)

module.exports = router
