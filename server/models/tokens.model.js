const { Schema, model } = require('mongoose')

const TokensSchema = new Schema({
  refreshToken: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('tokens', TokensSchema)
