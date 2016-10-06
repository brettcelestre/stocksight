
angular.module('StockSight.main.stock', [])

.service('Stock', function($http) {
  
  // Sends stock symbol to /stock
  var addStock = function(data) {
    return $http({
      method: 'POST',
      url: '/stock',
      data: JSON.stringify(data)
    }).then(function(data) {
      // If success
      
      // If stock symbol not found
      
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    addStock: addStock
  };
  
});
