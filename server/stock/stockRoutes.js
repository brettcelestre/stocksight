
// Imports stock controller
var stockController = require('./stockController.js'),
    Q = require('q');

module.exports = function(app) {

  app.route('/')
    .get(function(req, res) {
      console.log('stock / GET req.body ', req.body);
      res.send('stock / GET');
    })
    // Adds stock
    .post(stockController.addSymbol)
    // Deletes stock
    .delete(stockController.deleteSymbol);

};