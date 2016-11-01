
angular.module('StockSight.main.stock', [])

.service('Stock', function($http) {
  
  // Sends stock symbol to /stock
  var addStock = function(data) {
    return $http({
      method: 'POST',
      url: '/stock',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };
  
  // Sends stock symbol to /remove
  var removeStock = function(data) {
    console.log('removeStock service: ', data);
    return $http({
      method: 'DELETE',
      url: '/stock',
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    addStock: addStock,
    removeStock: removeStock
  };
  
});
