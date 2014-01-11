var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//Database Setup
require('./backend/loaders/database.loader');

//Controllers Setup
require('./backend/loaders/controllers.loader')(app, "/controllers/");

http.createServer(app).listen(app.get('port'), function(){
    console.log('Application running on port ' + app.get('port'));
});