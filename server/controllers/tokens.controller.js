const Token = require('../models/tokens.model');
const User = require('../models/user.model');
const { generateAccessToken } = require('../utils/tokens')

module.exports.refresh = async (req, res) => {

  try {
    const token = await Token.findOne({ refreshToken: req.cookies.refreshToken })
    if (token) {
      let tokenDate = Date.parse(token.expires)
      if (tokenDate > (Date.now() - 2000)) {

        const user = await User.findById(token.userId)
        if (user) {
          let AC = generateAccessToken({ userId: user._id })

          res.json({ res: true, newAccessToken: AC })
          return
        }

        res.json({ res: 1 })
        return
      }

      res.json({ res: 2 })
      return
    } else {
      res.json({ res: 3 })
    }
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.autoLogin = async (req, res) => {

  try {
    const token = await Token.findOne({ refreshToken: req.body.data })

    if (token) {
      if (Date.parse(token.expires) - 3000 > Date.now()) {
        res.json({ res: true })
        return
      }
    }
  } catch (e) {
    res.status(500).json(e)
  }

  res.json({ res: false })

}



