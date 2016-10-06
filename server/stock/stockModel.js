
// Adds Stock name to users stock array

    // Require mongoose for making any model
var mongoose = require('mongoose'),
    // Requires User model
    User = require('../signup/signupModel.js'),
    // Sets schema for user
    Schema = mongoose.Schema;
    
// Creates a new schema for a user
var StockSchema = new Schema({
  
  // symbol
  symbol: {
    type: String,
    require: true
  },
  
  // user who asked the question
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Created at time stamp
  createdAt: {
    type: Date,
    default: new Date()
  }
     
});

// Pre save middleware to save symbol as uppercase
StockSchema.pre('save', function(next) {
  // Creates uppercase symbol
  var uppercase = this.symbol.toUpperCase();
  // Updates symbol property with uppercase symbol
  this.symbol = uppercase;
  next();
});

// Post save middleware to add stock symbol to user's array of symbols
StockSchema.post('save', function(doc) {
  // Updates this users symbol array
  User.update({_id: doc.user}, {$push: {symbol: doc.symbol}})
    .exec(function() {
      return;
    });
});

module.exports = mongoose.model('Stock', StockSchema);
