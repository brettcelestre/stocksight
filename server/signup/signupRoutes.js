// var server = require('../server.js');

var signupController = require('./signupController.js');

module.exports = function(app) {

  app.route('/signup')
    .post(signupController.signup)

};