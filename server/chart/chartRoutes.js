
var chartController = require('./chartController');

// Auth routes
module.exports = function(app) {

  // Should check to see if user is authorized
  app.route('/')
    .get(chartController.queryStockData);

};