const express = require('express')
const grupo = require('../controllers/grupoController')

const router = express.Router()

router.get('/grupos', grupo.show)

module.exports = router
