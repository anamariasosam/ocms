const express = require('express')
const calendario = require('../controllers/calendarioController')
const passport = require('passport')
const passportService = require('../config/passport')

const requireAuth = passport.authenticate('jwt', { session: false })

const router = express.Router()

router.post('/calendarios', calendario.create)
router.get('/calendarios', requireAuth, calendario.show)
router.put('/calendarios', calendario.update)
router.delete('/calendarios', calendario.delete)

module.exports = router
