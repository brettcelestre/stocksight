
// Requires Sign Up Model - Mongoose schema
var User = require('./signupModel.js');

module.exports = {
  
  signup: function(req, res) {
    console.log('signupController signup() - req.body: ', req.body);
    // Creates new user model, passes in req.body
    var newUser = new User(req.body);
    // Saves new user
    newUser.save(function(err, user) {
      // Checks for error
      if (err) {
        // Sends error back
        res.send(err);
        return console.error(err);
      } else {
      // If no error, regenerates session
        req.session.regenerate(function() {
          // Adds this user to current session
          req.session.user = user;
          // Sets status at 201 and sends user back
          res.status(201).send({username: user.username, symbol: user.symbol});
        });
      }
    });
  }
  
};

