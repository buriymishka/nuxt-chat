const { Router } = require('express')
const auth = require('../middleware/auth')
const { create, loadById, getAll, remove, update, join, loadCurrentById, sendMessage } = require('../controllers/chats.controller')
const router = new Router()

router.post('/api/chats/create', auth, create)

router.get('/api/chats/loadById/:id', auth, loadById)

router.get('/api/chats/getAll', auth, getAll)

router.post('/api/chats/remove', auth, remove)

router.post('/api/chats/update', auth, update)

router.post('/api/chats/join', auth, join)

router.get('/api/chats/loadCurrentById/:id', auth, loadCurrentById)

router.post('/api/chats/sendMessage', auth, sendMessage)

module.exports = router