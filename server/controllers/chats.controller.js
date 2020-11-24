const bcrypt = require('bcrypt');
const ACParser = require('../utils/accessTokenParser')
const { createPassword } = require('../utils/functions')
const keys = require("../keys/index")
const Chat = require('../models/chats.model');
const User = require('../models/user.model');

module.exports.create = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  try {
    const chat = new Chat({
      title: req.body.title,
      password: createPassword(req.body.password),
      ownerId: token.userId
    })
    await chat.save()
    res.json({
      title: chat.title,
      id: chat._id
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  try {
    let chats = await Chat.find({ ownerId: token.userId }).select(['title'])
    chats = chats.map(chat => {
      return {
        id: chat._id,
        title: chat.title
      }
    })
    res.json(chats)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.loadById = async (req, res) => {

  try {
    const chat = await Chat.findById(req.params.id).select('title')
    res.json({
      title: chat.title,
      id: chat._id
    })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {

  try {
    await Chat.findByIdAndRemove(req.body.id)
    res.json({ res: true })
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.update = async (req, res) => {

  try {
    const updateObj = { title: req.body.title }
    if (req.body.password) {
      updateObj.password = createPassword(req.body.password)
    }
    let chat = await Chat.findByIdAndUpdate(req.body.id, updateObj)

    chat = await Chat.findById(req.body.id)
    res.json({
      title: chat.title,
      id: chat._id
    })
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.join = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  if (!req.body.number.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({ message: 'Wrong number or password' })
    return
  }

  try {
    const candidate = await Chat.findById(req.body.number)
    if (candidate) {
      let isPassCorrect = await bcrypt.compare(req.body.password, candidate.password)
      if (isPassCorrect) {
        if (!candidate.users.some(user => user._id == token.userId)) {
          candidate.users.push(token.userId)
          let { name:userName } = await User.findById(token.userId).select('name')
          candidate.messages.push({
            ownerId: keys.systemId,
            content: `${userName} joined`
          })
          await candidate.save()
        }

        res.json({
          id: candidate._id,
          title: candidate.title
        })
        return
      } else {
        res.status(404).json({ message: 'Wrong number or password' })
        return
      }
    } else {
      res.status(404).json({ message: 'Wrong number or password' })
      return
    }
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.loadCurrentById = async (req, res) => {

  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(404).json({ message: 'Not found' })
    return
  }

  try {
    const chat = await Chat.findById(req.params.id)
    if (chat) {

      let fullUsers = await User.find({
        '_id': {
          $in: chat.users
        }
      }).select('name')
      fullUsers = fullUsers.map(user => ({
        id: user._id,
        name: user.name
      }))

      res.json({
        title: chat.title,
        id: chat._id,
        users: fullUsers,
        messages: chat.messages
      })
    } else {
      res.status(404).json({ message: 'Not found' })
      return
    }
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.sendMessage = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  if (!req.body.chatId.match(/^[0-9a-fA-F]{24}$/) || !req.body.content) {
    res.status(404).json({ message: 'How did you do that???' })
    return
  }

  try {
    const chat = await Chat.findById(req.body.chatId)
    if (chat) {
      chat.messages.push({
        ownerId: token.userId,
        content: req.body.content
      })
      await chat.save()
      res.json({
        ownerId: token.userId,
        content: req.body.content
      })
    } else {
      res.status(404).json({ message: 'Chat not found' })
    }
  } catch (e) {
    res.status(500).json(e)
  }

}
