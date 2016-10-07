
// Requires async parallel
var parallel =  require('async/parallel'),
    request = require('request');

module.exports = {
  
  queryStockData: function(req, res) {
    console.log('queryStockData: ', req.session.user.symbol);
    
    // Stores all stocks in array
    var allStocks = req.session.user.symbol,
    // Stores all functions for async API call
        apiFunctions = [];
    
    // Iterate over allStocks and make an API call with each symbol
    allStocks.forEach(function(val) {
        
    });
    
      // Iterate over allStocks and build an array of functions with each symbol
      
      // Once all functions are build, pass that array through async/parallel
      
        request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + reqSymbol + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(error, response, body){
          // Checks for errors
          if (error) {
            console.error('error with SYMBOL check', error);  
            return false;
          }
        }
      
      // Once that is done, send results as response
    
  }
  
};

