
angular.module('StockSight.main.chart.service', [])

.service('Chart', function($http) {
    
  // Sends stock symbol to /stock
  var updateData = function() {
    return $http({
      method: 'GET',
      url: '/chart',
    }).then(function(data) {
      // If success
      
      // If stock symbol not found
      
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    updateData: updateData
  };
  
});
