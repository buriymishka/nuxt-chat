const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const ACParser = require('../utils/accessTokenParser')
const { createPassword, generatePassword, sendMail } = require('../utils/functions')
const User = require('../models/user.model')
const Chat = require('../models/chats.model');

module.exports.load = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  try {
    const user = await User.findById(token.userId)
    res.json({
      name: user.name,
      email: user.email,
      image: user.image,
      id: user._id
    })
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.signUp = async (req, res) => {

  try {
    let candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
      res.status(409).json({ message: 'email already exists' })
      return;
    }
  } catch (e) {
    res.status(500).json(e)
  }


  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: createPassword(req.body.password)
    })
    await user.save()

    res.json({
      name: user.name,
      email: user.email,
      image: user.image,
      id: user._id
    })
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.signIn = async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
      let isPassCorrect = await bcrypt.compare(req.body.password, candidate.password)
      if (isPassCorrect) {
        res.json({
          name: candidate.name,
          email: candidate.email,
          image: candidate.image,
          id: candidate._id
        })
      } else {
        res.status(404).json({ message: 'Wrong email or password' })
      }
    } else {
      res.status(404).json({ message: 'Wrong email or password' })
    }
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.logout = async (req, res) => {
  res.json({ res: true })
}

module.exports.recover = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const newPasswordPlain = generatePassword()
      const newPasswordHash = createPassword(newPasswordPlain)
      await sendMail(req.body.email, newPasswordPlain)
      await user.updateOne({ password: newPasswordHash })
      res.json({})
    } else {
      res.status(404).json({ message: 'No user with this email' })
    }
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.update = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  try {
    let candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
      if (candidate._id != token.userId){
        res.status(409).json({ message: 'email already exists' })
        return;
      }
    }
  } catch (e) {
    res.status(500).json(e)
  }

  try {
    const updateObj = { email: req.body.email, name: req.body.name }
    if (req.body.newPassword) {
      updateObj.password = createPassword(req.body.newPassword)
    }
    if (req.file) {
      updateObj.image = `/uploads/${req.file.filename}`
    }

    let user = await User.findByIdAndUpdate(token.userId, updateObj)

    user = await User.findById(token.userId)
    res.json({
      name: user.name,
      image: user.image,
      email: user.email,
      id: user._id
    })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }

}

module.exports.loadRecentChats = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  try {
    let { recentChats: userRecentChatsIds } = await User.findById(token.userId).select('recentChats')
    let recentChats = await Chat.find({
      '_id': { $in: userRecentChatsIds }
    }).select('title')
    recentChats = recentChats.map(chat => ({
      id: chat._id,
      title: chat.title
    }))
    res.json(recentChats)
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.addRecentChat = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  try {
    const user = await User.findById(token.userId)
    let resObj = {}
    if (!user.recentChats.some(chat => chat._id == req.body.id)) {
      user.recentChats.push(req.body.id)
      await user.save()
      resObj.newRecentChat = true
    }
    const chat = await Chat.findById(req.body.id).select('title')
    resObj.id = chat._id
    resObj.title = chat.title
    res.json(resObj)

  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.removeRecentChat = async (req, res) => {
  const token = ACParser.parse(req.headers.access_token)

  try {
    let user = await User.findById(token.userId)
    user.recentChats = user.recentChats.filter(chat => chat._id != req.body.id)
    await user.save()
    res.json({})
  } catch (e) {
    res.status(500).json(e)
  }

}
