const btoa = require('btoa');
const atob = require('atob');

const sha256 = require('crypto-js/sha256');
const hmacSHA512 = require('crypto-js/hmac-sha512');
const Base64 = require('crypto-js/enc-base64');

const keys = require('../keys/index')

const SECRET_KEY = keys.SECRET_KEY;


module.exports.generateRefreshToken = function (length = 64) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function signToken(headers, payload) {
  const hashDigest = sha256(headers + payload);
  const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, SECRET_KEY));
  return hmacDigest
}

module.exports.generateAccessToken = function (payload) {

  payload.expires = Date.now() + (1000 * 60 * 30)

  let BHeaders = btoa(JSON.stringify({ typ: 'JWT', alg: 'SHA256' }))
  let BPayload = btoa(JSON.stringify(payload))
  return (BHeaders + '.' + BPayload + '.' + signToken(BHeaders, BPayload))
}

module.exports.getAccessTokenPayload = token => {

  let arr = token.split('.')
  let res = atob(arr[1])
  return JSON.parse(res)
}

module.exports.checkAccessToken = token => {

  if (!token) {
    return false
  }
  let arr = token.split('.')
  if (arr.length !== 3) {
    return false
  }
  let parsed = JSON.parse(atob(arr[1]))
  if (parsed.expires < (Date.now() - 1000)) {
    return false
  }
  if (signToken(arr[0], arr[1]) === arr[2]) {
    return true
  }

  return false
}
