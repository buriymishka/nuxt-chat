const { checkAccessToken } = require('../utils/tokens')

module.exports = function(req, res, next) {
  if (checkAccessToken(req.headers.access_token)) {
    next()
  } else {
    res.status(401).json({ message: 'You must authenticate first' })
  }

}