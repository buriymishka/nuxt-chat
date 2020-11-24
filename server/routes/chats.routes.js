const { Router } = require('express')
const { create, loadById, getAll, remove, update, join, loadCurrentById, sendMessage } = require('../controllers/chats.controller')
const router = new Router()

router.post('/api/chats/create', create)

router.get('/api/chats/loadById/:id', loadById)

router.get('/api/chats/getAll', getAll)

router.post('/api/chats/remove', remove)

router.post('/api/chats/update', update)

router.post('/api/chats/join', join)

router.get('/api/chats/loadCurrentById/:id', loadCurrentById)

router.post('/api/chats/sendMessage', sendMessage)

module.exports = router