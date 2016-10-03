
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
    var username = req.body.username,
        plainPassword = req.body.password;
    // Searches database for this user
    User.findOne({username: username})
      .exec(function(err, user) {
        if (!user) {
          res.status(404).send({error: 'User not found'});
        } else {
          // Checks if password matches encrypted password in database
          return user.comparePasswords(plainPassword)
            .then(function(foundUser) {
              if (!foundUser) {
                res.status(404).send({error: 'password does not match'});
              } else {
                // Regenerates new session
                req.session.regenerate(function() {
                // Sets session to this user
                req.session.user = user;
                // Sends back only username and symbol
                res.send({username: user.username, symbol: user.symbol});
              });
              }
            });
        }
      })
  },
  
  // Logout user and destroy session
  logout: function(req, res) {
    console.log('logout ran');
    req.session.destroy(function() {
      res.redirect('/');
    });
  }
  
};

