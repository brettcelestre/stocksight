// main server file run in node or with nodemon to start server
var server;
var express = require('express');
var middleware = require('./config/middleware.js');
var mongoose = require('mongoose');
var Q = require('q');
// make mongoose use q promises
mongoose.Promise = Q.Promise;
var session = require('express-session');
// Connects mongodb to sessions
var MongoStore = require('connect-mongo')(session);

// connection to mongodb
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } };       
 
var mongodbUri = process.env.mongoDB;
 
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;
 
var app = express();

conn.on('error', console.error.bind(console, 'connection error:'));

// use mongo to store sessions
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: "please don't tell",
  resave: true,
  saveUninitialized: true
}));

// SET UP MIDDLEWARE + ROUTES
middleware(app, express);

var PORT = process.env.PORT || 3000;

server = app.listen(PORT);
console.log('qurvey is listening on ' + PORT);

// export for test
module.exports = app;




