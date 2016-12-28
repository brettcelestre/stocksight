
angular.module('StockSight.main.chart', [])

.controller('ChartController', function($scope, $rootScope, $state, Main, Chart) {
  
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
          console.log('Chart Stock Data: ', data.data);
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
  
  $rootScope.$on("RefreshChart", function(){
    $scope.refreshChart();
  });
  
  // init function calls refreshChart on view load
  $scope.init = function(){
    $scope.refreshChart();
  }();

})

// Filters numbers to 2 decimal places
.filter('numberEx', ['numberFilter', '$locale',
  function(number, $locale) {

    var formats = $locale.NUMBER_FORMATS;
    return function(input, fractionSize) {
      //Get formatted value
      var formattedValue = number(input, fractionSize);

      //get the decimalSepPosition
      var decimalIdx = formattedValue.indexOf(formats.DECIMAL_SEP);

      //If no decimal just return
      if (decimalIdx == -1) return formattedValue;


      var whole = formattedValue.substring(0, decimalIdx);
      var decimal = (Number(formattedValue.substring(decimalIdx)) || "").toString();

      return whole +  decimal.substring(1);
    };
  }
]);
