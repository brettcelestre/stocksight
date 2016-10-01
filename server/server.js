var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./config/middleware.js');

// express server instance
var app = express();

//SET UP MIDDLEWARE + ROUTES
middleware(app, express);

var PORT = process.env.PORT || 9000;

// Save the HTTP server created with express as a variable in order to reuse for socket.io
var server = app.listen(PORT);
console.log('Listening on', PORT); 

// export app
module.exports = app;