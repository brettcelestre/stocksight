
var authController = require('./authController');

// Auth routes
module.exports = function(app) {

  // Should check to see if user is authorized
  app.route('/checksession')
    .get(authController.checkSession);

  // Login user
  app.route('/login')
    .post(function(req, res) {
      console.log('auth/login:POST - req.body: ', req.body);
      
    });

};