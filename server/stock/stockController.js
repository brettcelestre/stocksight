
// Node API calls
var request = require('request'),
// Requires Sign Up Model - Mongoose schema
    Stock = require('./stockModel.js');

module.exports = {
  
  addSymbol: function(req, res) {
    console.log('checkSymbolValid() - req: ', req.body);
    
    var reqSymbol = req.body.symbol;
    
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
        if ( data.query.results.quote.Symbol === reqSymbol ){
          
          console.log('valid check, SYMBOL = : ', data['query']['results']['quote']['Symbol']);
          // console.log('req.session.user._id: ', req.session.user._id);
          
          
          // Creates data object for Stock schema
          var symbolData = {'symbol': reqSymbol};
          // Adds user id to Stock schema
          symbolData.user = req.session.user._id;
          console.log('symbolData: ', symbolData);
          
          // Creates new Stock symbol with data
          var newSymbol = new Stock(symbolData);
          // Saves it
          newSymbol.save(function(err, newSymbol) {
            if (err) {
              console.log('SHIT: ');
              console.error(err);
              res.status(500).send(err);
            } else {
              console.log('Stock Symbol Success: ', newSymbol);
              var userData = {
                symbol: newSymbol.symbol
              }
              res.status(201).send(userData);
            }
          });
                 
          
          // Check if symbol has all required data
            // return only required data;
          
          // Then add updated symbol list to req.session 
          
        } else  {
          // If symbol doesn't exists
          // return false
          
        }
        
        
        
        
        
        // Sends body back to front-end
        // res.send(body);
        // console.log('successful - body: ', body);
        
        
        // TESTING
        // data = body;
        // res.send(body);
        // return body;
      });
    
  }
  
};

