
// Requires Sign Up Model - Mongoose schema
var User = require('../signup/signupModel.js');

module.exports = {
  
  checkSession: function(req, res) {
    if (req.session.user) {
      User.findOne({username: req.session.user.username})
        .exec(function(err, user) {
            if (err) {
              console.error(err);
            } else {
              req.session.user = user;
              var currentUser = {
                user: user['username'],
                stock: user['symbol']
              }
              console.log('currentUser: ', currentUser);
              res.send(currentUser);
            }
          });
    }
  },
  
  login: function(req, res) {
    console.log('login ran | req.body: ', req.body);
  },
  
  // Logout user and destroy session
  logout: function(req, res) {
    console.log('logout ran');
    req.session.destroy(function() {
      res.redirect('/');
    });
  }
  
};

