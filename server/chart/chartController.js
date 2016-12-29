
// Requires async parallel
var parallel =  require('async/parallel'),
    request = require('request');

module.exports = {
  
  queryStockData: function(req, res) {
    // Stores all stocks in array
    var allStocks = req.session.user.symbol,
    // Stores all API functions for async API calls
        APIfunctions = [];

    // Iterate over allStocks and builds an array of api call functions with each symbol
    allStocks.forEach(function(val) {
      
      // Yahoo API - Retrieves: Fund Name | Symbol | 52 w high | 52 w low
      APIfunctions.push(
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
      
      // Morning Star Main API - Retrieves: 10 year | 5 year | 3 year | 1 year | 1 month | 1 week | 1 day | ytd | symbol
      APIfunctions.push(
        function(callback) {
          request('https://extraction.import.io/query/extractor/439fe8e4-fcb3-472a-a03d-6c90da94a2a8?_apikey=6597f163bbf74909813f659204b6066a2bdd0dd37460dd696eee23e324fb6447c59b7c4292ae98430ba815c1faf781d979996266132c4b00b46b649f30f7caf0c275073d93abf5f810be2936f6cebc99&url=http%3A%2F%2Fperformance.morningstar.com%2Ffund%2Fperformance-return.action%3Ft%3D' + val + '%26region%3Dusa%26culture%3Den-US', function(error, response, body){
            // Checks for errors
            if (error) {
              console.error('error with SYMBOL check', error);  
              return false;
            }
            // Parses body into JSON
            var data = JSON.parse(body);
            // Sends whole stock quote data back
            callback(null, data.extractorData.data[0]);
          });
        }
      );
      
      // Morning Star API - Retrieves: 10 year growth
      APIfunctions.push(
        function(callback) {
          request('https://extraction.import.io/query/extractor/074277cc-def8-4921-a6d4-8c6e96ba7025?_apikey=6597f163bbf74909813f659204b6066a2bdd0dd37460dd696eee23e324fb6447c59b7c4292ae98430ba815c1faf781d979996266132c4b00b46b649f30f7caf0c275073d93abf5f810be2936f6cebc99&url=http%3A%2F%2Fquotes.morningstar.com%2Fchart%2Ffund%2Fchart%3Ft%3D' + val + '%26region%3Dusa%26culture%3Den-US', function(error, response, body){
            // Checks for errors
            if (error) {
              console.error('error with SYMBOL check', error);  
              return false;
            }
            // Parses body into JSON
            var data = JSON.parse(body);
            // Sends whole stock quote data back
            callback(null, data.extractorData.data[0]);
          });
        }
      );
      
    });
    
    // Pass APIfunctions array through async/parallel
    parallel( APIfunctions, function(err, results) {
      if ( err ) {
        console.error('Error with chartController.queryStockData - parallel function');
        console.error(' >>> ', err)
      }
      
      // Stores final data
      var finalResults = {};
      
      // Iterate over results and consolidates data into finalResults object
      results.forEach(function(val) {
        // It's from Yahoo API
        if ( Object.keys(val).length > 6 ) {
          // Makes key in finalResults out of symbol
          finalResults[val.Symbol] = {};
          // Pushes values into finalResult symbol object
          for ( var key in val ) {
            finalResults[val.Symbol][key] = val[key];
          }
        // It's from Morning Star Main API
        } else if ( val.group[0]['1-day'] ) {
          // Pushes values into finalResult symbol object
          for ( var key in val.group[0] ) {
            finalResults[val.group[0]['symb'][0]['text']][key] = val.group[0][key][0]['text'];
          }
        // It's from Morning Star 10-year-growth API
        }  else if ( val.group[0]['10-year-growth'] ) {
          // Adds 10-year-growth value to finalResult object
          finalResults[val.group[0]['symb'][0]['text']]['10-year-growth'] = val.group[0]['10-year-growth'][0]['text'];
        }
      });
      
      // Sends all results back
      res.status(200).send(finalResults);
    });
    
  }
  
};

