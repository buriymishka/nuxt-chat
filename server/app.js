const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)


const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const db = require('./db')

const routerTokens = require('./routes/tokens.routes')
const routerUsers = require('./routes/user.routes')
const routerChats = require('./routes/chats.routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(routerTokens)
app.use(routerUsers)
app.use(routerChats)


io.on('connection', socket => {

  socket.on('joinToChat', id => {
    socket.join(id);
  })

  socket.on('leftChat', id => {
    socket.leave(id);
  })

  socket.on('addUserToChat', data => {
    socket.to(data.chatId).emit('addUserToCurrentChat', data)
  })

  socket.on('createMessage', data => {
    socket.to(data.chatId).emit('newMessage', data)
  })
})

module.exports = {
  app,
  server
}
