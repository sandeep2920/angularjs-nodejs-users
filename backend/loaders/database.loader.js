var mongoose = require('mongoose');
var database = require('./../config/database');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao MongoDB.');
});

mongoose.connect(database.url);
