const upload = require('../middleware/upload')
const { Router } = require('express')
const auth = require('../middleware/auth')
const { load, signUp, signIn, logout, recover, update, loadRecentChats, addRecentChat, removeRecentChat } = require('../controllers/user.controller')
const router = new Router()

router.get('/api/user/load', auth, load)

router.post('/api/user/signup', signUp)

router.post('/api/user/signin', signIn)

router.post('/api/user/logout', logout)

router.post('/api/user/recover', recover)

router.post('/api/user/update', auth, upload.single('image'), update)

router.get('/api/user/loadRecentChats', auth, loadRecentChats)

router.post('/api/user/addRecentChat', auth, addRecentChat)

router.post('/api/user/removeRecentChat', auth, removeRecentChat)

module.exports = router