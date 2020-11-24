const upload = require('../middleware/upload')
const { Router } = require('express')
const { load, signUp, signIn, logout, recover, update, loadRecentChats, addRecentChat, removeRecentChat } = require('../controllers/user.controller')
const router = new Router()

router.get('/api/user/load', load)

router.post('/api/user/signup', signUp)

router.post('/api/user/signin', signIn)

router.post('/api/user/logout', logout)

router.post('/api/user/recover', recover)

router.post('/api/user/update', upload.single('image'), update)

router.get('/api/user/loadRecentChats', loadRecentChats)

router.post('/api/user/addRecentChat', addRecentChat)

router.post('/api/user/removeRecentChat', removeRecentChat)

module.exports = router