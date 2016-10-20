    // Requires express
var express = require('express'),
    // Requires mongoose
    mongoose = require('mongoose'),
    // Imports middleware
    middleware = require('./config/middleware.js'),
    // Sets up Q promises
    Q = require('q'),
    // Requires express session
    session = require('express-session'),
    // Connects mongodb to sessions
    MongoStore = require('connect-mongo')(session),
    // Imports config file for connecting mongodb
    // config = require('./config/config.js'),
    // connection to mongodb
    options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } } },
    // express server instance
    app = express();
    // config = require('./config/config.js');

// Make mongoose use q promises
mongoose.Promise = Q.Promise;

// Connects to remote MongoDB
var mongodbUri = process.env.mongoDB;
mongoose.connect(mongodbUri, options);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

// use mongo to store sessions
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: "please don't tell",
  resave: true,
  saveUninitialized: true
}));

//SET UP MIDDLEWARE + ROUTES
middleware(app, express);

var PORT = process.env.PORT || 9000;

// Save the HTTP server created with express as a variable in order to reuse for socket.io
// var server = app.listen(PORT);
app.listen(PORT);
console.log('Listening on', PORT); 

// export app
module.exports = app;

