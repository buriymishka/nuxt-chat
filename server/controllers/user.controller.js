const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { getAccessTokenPayload } = require('../utils/tokens')
const { createPassword, generatePassword, sendMail } = require('../utils/functions')
const { generateRefreshToken, generateAccessToken } = require('../utils/tokens')
const User = require('../models/user.model')
const Chat = require('../models/chats.model');
const Token = require('../models/tokens.model');

module.exports.load = async (req, res) => {
  const token = getAccessTokenPayload(req.headers.access_token)
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

    const generatedRefreshToken = generateRefreshToken()
    const token = new Token({
      refreshToken: generatedRefreshToken,
      userId: user._id,
      expires: Date.now() + (1000 * 60 * 60 * 24 * 30)
    })
    await token.save()
    res.cookie('refreshToken', generatedRefreshToken, { maxAge: 2592000000, httpOnly: true });
    const generatedAccessToken = generateAccessToken({ userId: user._id })
    
    res.json({
      name: user.name,
      email: user.email,
      image: user.image,
      id: user._id,
      accessToken: generatedAccessToken
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

        const generatedRefreshToken = generateRefreshToken()
        const token = new Token({
          refreshToken: generatedRefreshToken,
          userId: candidate._id,
          expires: Date.now() + (1000 * 60 * 60 * 24 * 30)
        })
        await token.save()
        res.cookie('refreshToken', generatedRefreshToken, { maxAge: 2592000000, httpOnly: true });
        const generatedAccessToken = generateAccessToken({ userId: candidate._id })

        res.json({
          name: candidate.name,
          email: candidate.email,
          image: candidate.image,
          id: candidate._id,
          accessToken: generatedAccessToken
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

  try {
    res.clearCookie('refreshToken')
    const token = await Token.findOneAndRemove({ refreshToken: req.cookies.refreshToken })
    res.json({ res: true })
  } catch (e) {
    res.status(500).json(e)
  }

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
  const token = getAccessTokenPayload(req.headers.access_token)

  try {
    let candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
      if (candidate._id != token.userId) {
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
    res.status(500).json(e)
  }

}

module.exports.loadRecentChats = async (req, res) => {
  const token = getAccessTokenPayload(req.headers.access_token)

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
  const token = getAccessTokenPayload(req.headers.access_token)

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
  const token = getAccessTokenPayload(req.headers.access_token)

  try {
    let user = await User.findById(token.userId)
    user.recentChats = user.recentChats.filter(chat => chat._id != req.body.id)
    await user.save()
    res.json({})
  } catch (e) {
    res.status(500).json(e)
  }

}
