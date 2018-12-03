const express = require('express'),
  usuario = require('../controllers/usuarioController')

const router = express.Router()

router.get('/usuarios', usuario.show)

module.exports = router
