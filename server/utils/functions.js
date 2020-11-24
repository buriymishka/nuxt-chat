const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const keys = require("../keys/index")

module.exports.createPassword = function (plain) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plain, salt);
  return hash
}

module.exports.generatePassword = function () {
  let length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

module.exports.sendMail = async function (email, newPass) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: keys.emailUser,
      pass: keys.emailPassword
    }
  });

  await transporter.sendMail({
    from: 'nuxt-chat', // sender address
    to: email, // list of receivers
    subject: "Password recover", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>New password: ${newPass}</b>`, // html body
  });
}


