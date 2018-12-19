const express = require('express'),
  lugar = require('../controllers/lugarController')

const router = express.Router()

router.get('/lugares', lugar.show)

module.exports = router
