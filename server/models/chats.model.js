const { Schema, model } = require('mongoose')
const keys = require("../keys/index")

const MessagesSchema = new Schema({ ownerId: String, content: String })
const UsersSchema = new Schema({ userId: String })

const ChatSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 2
  },
  ownerId: {
    type: String,
    required: true
  },
  users: {
    type: [UsersSchema],
    default: [{ _id: keys.systemId}]
  },
  messages: {
    type: [MessagesSchema],
    default: []
  }

})

module.exports = model('chats', ChatSchema)
