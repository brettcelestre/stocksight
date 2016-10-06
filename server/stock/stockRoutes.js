
// Imports stock controller
var stockController = require('./stockController.js'),
    Q = require('q');

module.exports = function(app) {

  app.route('/')
    .get(function(req, res) {
      console.log('stock / GET req.body ', req.body);
      res.send('stock / GET');
    })
    .post(stockController.addSymbol);
    
    // .post(function(req, res) {
    //   console.log('stock / POST req.body.symbol ', req.body.symbol);
    //   var symbol = req.body.symbol;
    //   // Check if symbol is valid
    //   stockController.checkSymbolValid(symbol)      
    //   // res.send('stock / POST');
    // });

};