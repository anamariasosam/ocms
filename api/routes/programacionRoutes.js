const express = require('express'),
  programacion = require('../controllers/programacionController')

const router = express.Router()

router.post('/programaciones', programacion.create)
router.get('/programaciones', programacion.show)
router.put('/programaciones', programacion.update)
router.delete('/programaciones', programacion.delete)

module.exports = router
