const express = require('express')

const calendarioRoutes = require('./calendarioRoutes')
const programacionRoutes = require('./programacionRoutes')

const router = express.Router()

router.use('/api', calendarioRoutes)
router.use('/api', programacionRoutes)

module.exports = router
