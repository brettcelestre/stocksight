
// Requires async parallel
var parallel =  require('async/parallel'),
    request = require('request');

module.exports = {
  
  queryStockData: function(req, res) {
    // Stores all stocks in array
    var allStocks = req.session.user.symbol,
    // Stores all functions for async API call
        apiFunctions = [];
    
    // Iterate over allStocks and builds an array of functions with each symbol
    allStocks.forEach(function(val) {
      // Stores all functions inside apiFunctions array
      apiFunctions.push(
        function(callback) {
          request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + val + '%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(error, response, body){
            // Checks for errors
            if (error) {
              console.error('error with SYMBOL check', error);  
              return false;
            }
            // Parses body into JSON
            var data = JSON.parse(body);
            // Sends whole stock quote data back
            callback(null, data.query.results.quote);
          });
        }
      );
    });
    
    // Pass apiFunctions array through async/parallel
    parallel( apiFunctions, function(err, results) {
      // Sends all results back
      res.status(200).send(results);
    });
    
  }
  
};

