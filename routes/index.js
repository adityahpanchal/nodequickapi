const router = require('express').Router()
const apiRoutes = require('./apiRoutes/index')

router.use('/api', apiRoutes)

module.exports = router