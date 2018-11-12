const express = require('express')
const calendario = require('../controllers/calendarioController')

const router = express.Router()

router.post('/calendarios', calendario.create)
router.get('/calendarios', calendario.show)
router.put('/calendarios', calendario.update)
router.delete('/calendarios', calendario.delete)

module.exports = router
