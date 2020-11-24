const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')

const routerUsers = require('./routes/user.routes')
const routerChats = require('./routes/chats.routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(routerUsers)
app.use(routerChats)

module.exports = {
  // path: '/routes',
  handler: app
}