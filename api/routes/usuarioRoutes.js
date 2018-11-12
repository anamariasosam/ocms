const express = require('express')
const usuario = require('../controllers/usuarioController')

const router = express.Router()

router.get('/usuarios', usuario.show)

module.exports = router
