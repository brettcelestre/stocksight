
// This model creates a new user

    // Require mongoose for making any model
var mongoose = require('mongoose'),
    // Require Q for promises
    Q = require('q'),
    // Encrypting passwords
    bcrypt = require('bcrypt-nodejs'),
    // Sets salt factor
    SALT_WORK_FACTOR = 10,
    // Sets schema for user
    Schema = mongoose.Schema;
    
// Creates a new schema for a user
var UserSchema = new Schema({
  
  // Username
  username: {
    type: String,
    required: true,
    unique: true
  },
  
  // Password
  password: {
    type: String,
    require: true
  },
  
  // Salts string for password hashing
  salt: String,
  
  // Stores stock symbols in array as strings
  symbol: [String],
  
  createdAt: {
    type: Date,
    default: new Date()
  }
     
});

// use for login to check password
UserSchema.methods.comparePasswords = function (plainPassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(plainPassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

// on signup generate salt and hash plaintext password 
UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the plaintext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
