const { Schema, model } = require('mongoose')

const RecentChatsSchema = new Schema({ chatId: String })

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 2
  },
  recentChats: {
    type: [RecentChatsSchema],
    default: []
  },
  image: {
    type: String,
    default: ''
  }
})

module.exports = model('users', UserSchema)
