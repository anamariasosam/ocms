const express = require('express')
const tipoProgramacion = require('../controllers/tipoProgramacionController')

const router = express.Router()

router.get('/tipoProgramaciones', tipoProgramacion.show)

module.exports = router
