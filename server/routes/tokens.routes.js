const { Router } = require('express')
const { refresh, autoLogin } = require('../controllers/tokens.controller')
const router = new Router()

router.get('/api/tokens/refresh', refresh)

router.post('/api/tokens/autoLogin', autoLogin)

module.exports = router
