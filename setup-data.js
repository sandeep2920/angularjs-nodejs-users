var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao MongoDB.');
});

mongoose.connect('mongodb://localhost/angular-nodejs-users');

var userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema);

var userA = new User({
  name: 'Clark Kent',
  username: 'clark',
  password: 'clark123'
});

//userA.save(function(err, model) {
//  if (err) return console.error(err);
//  console.dir(model);
//});

var userB = new User({
  name: 'Bruce Wayne',
  username: 'bruce',
  password: 'bruce123'
});

//userB.save(function(err, model) {
//  if (err) return console.error(err);
//  console.dir(model);
//});

User.find(function(err, users) {
  if (err) return console.error(err);
  console.dir(users);
});

console.log("********************");

User.findOne({ username: 'clark' }, function(err, user) {
  if (err) return console.error(err);
  console.dir(user);
});