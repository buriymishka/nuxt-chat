const mongoose = require('mongoose');
const keys = require('./keys/index')
// mongodb database connection string. change it as per your needs. here "mydb" is the name of the database. You don't need to create DB from mongodb terminal. mongoose create the db automatically.
mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

});

module.exports = db

