
angular.module('StockSight.main.chart', [])

.controller('ChartController', function($scope, $state, Main, Chart) {
  
  // Stores all stock data for chart  
  $scope.chartData = [];

  // Calls /chart API to retrieve all stock data
  $scope.refreshChart = function(){  
    // Selects Spinner and Chart DOM elements    
    $spinner = document.getElementById('spinner');
    $chart = document.getElementById('chart');
    // Hides Chart
    $chart.style.display = "none";
    // Shows Spinner
    $spinner.style.display = "block";
    // Calls API for stock data
    Chart.updateData()
      .then(function(data){
        // If successful request
        if (data.status === 200) {
          // console.log('Chart Stock Data: ', data.data);
          // Hide Spinner
          $spinner.style.display = "none";
          // Show Chart
          $chart.style.display = "block";
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
  };
  
  // init function calls refreshChart on view load
  $scope.init = function(){
    $scope.refreshChart();
  }();

});
