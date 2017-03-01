
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
            // console.log('CC Yahoo API Data: ', data);
            // Sends whole stock quote data back
            callback(null, data.query.results.quote);
          });
        }
      );
      
      // Exceeded import.io api limit for next 2 functions
      
      // Morning Star Main API - Retrieves: 10 year | 5 year | 3 year | 1 year | 1 month | 1 week | 1 day | ytd | symbol
      /* APIfunctions.push(
        function(callback) {
          request('https://extraction.import.io/query/extractor/89870cad-f5d4-4aea-a32c-9636632d1799?_apikey=e83763dad58e450887c8935ba4166dd7ce43c34899f5718cd8e16877040060c1865fd61c1ed71ded4fb3fd7864b82a4fcb14e9d74aa567e88c20982b4f814ca870c0b7b8eb0e46f0992612fde4d67fca&url=http%3A%2F%2Fperformance.morningstar.com%2Ffund%2Fperformance-return.action%3Ft%3D' + val + '%26region%3Dusa%26culture%3Den-US', function(error, response, body){
            // Checks for errors
            if (error) {
              console.error('error with SYMBOL check', error);  
              return false;
            }
            // Parses body into JSON
            var data = JSON.parse(body);
            console.log('CC Main API Data: ', data);
            // Sends whole stock quote data back
            // callback(null, data.extractorData.data[0]);
          });
        }
      );
      
      // Morning Star API - Retrieves: 10 year growth
      APIfunctions.push(
        function(callback) {
          request('https://extraction.import.io/query/extractor/5a947525-c80a-4bc6-ae12-ce1890d09984?_apikey=e83763dad58e450887c8935ba4166dd7ce43c34899f5718cd8e16877040060c1865fd61c1ed71ded4fb3fd7864b82a4fcb14e9d74aa567e88c20982b4f814ca870c0b7b8eb0e46f0992612fde4d67fca&url=http%3A%2F%2Fquotes.morningstar.com%2Fchart%2Ffund%2Fchart%3Ft%3D' + val +'%26region%3Dusa%26culture%3Den-US', function(error, response, body){
            // Checks for errors
            if (error) {
              console.error('error with SYMBOL check', error);  
              return false;
            }
            // Parses body into JSON
            var data = JSON.parse(body);
            console.log('CC 10 year Data: ', data);
            // Sends whole stock quote data back
            // callback(null, data.extractorData.data[0]);
          });
        }
      );
      */
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
        // console.log(' >>> typeof: ', typeof val);
        // console.log('chartController ---- val: ', val);
        
        // It's from Yahoo API
        if ( Object.keys(val).length >= 6 ) {
          // Makes key in finalResults out of symbol
          finalResults[val.Symbol] = {};
          // Pushes values into finalResult symbol object
          for ( var key in val ) {
            finalResults[val.Symbol][key] = val[key];
          }
          // console.log('finalResults so far: ', finalResults);
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

