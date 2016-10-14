
// Node API calls
var request = require('request'),
// Requires Sign Up Model - Mongoose schema
    Stock = require('./stockModel.js');

module.exports = {
  
  addSymbol: function(req, res) {
    var reqSymbol = req.body.symbol.toUpperCase();
    console.log('Symbol to add: ', reqSymbol);
    
    // Calls Yahoo Finance API with symbol
    request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + reqSymbol + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(error, response, body){
      // Checks for errors
      if (error) {
        console.error('error with SYMBOL check', error);  
        return false;
      }
      // Parses body into JSON
      var data = JSON.parse(body);

      // If valid, add symbol to user's symbol in DB
      if ( data.query.results.quote.Name !== null ) {
        // Creates data object for Stock schema
        var symbolData = {'symbol': reqSymbol};
        // Adds user id to Stock schema
        symbolData.user = req.session.user._id;
        // Creates new Stock symbol with data
        var newSymbol = new Stock(symbolData);
        // Saves it
        newSymbol.save(function(err, newSymbol) {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            console.log('Stock symbol ' + newSymbol + ' has been added successfully.');
            var userData = {
              symbol: newSymbol.symbol
            }
            // Adds symbol to users session array
            req.session.user.symbol.push(reqSymbol);
            // Sends response with symbol only
            res.status(201).send(userData);
          }
        });
      } else {
        // If symbol doesn't exists
        res.status(404).send({'error': 'Symbol not found'});
      }
      
    });
    
  }
  
};

