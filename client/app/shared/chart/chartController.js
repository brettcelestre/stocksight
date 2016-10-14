
angular.module('StockSight.main.chart', [])

.controller('ChartController', function($scope, $state, Main, Chart) {
  
  $scope.chartData = [];
  
  // Calls /chart API to retrieve all stock data
  $scope.refreshChart = function(){    
    Chart.updateData()
      .then(function(data){
        // If successful login
        if (data.status === 200) {
          console.log('Successful retrieval: ', data);  
          console.log('chart data: ', data.data);
          // Store stock data inside chart data
          $scope.chartData = data.data;
        } else {
          // Displays login error
            // TODO
        }
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
  }();

});
