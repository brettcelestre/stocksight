
angular.module('StockSight.main.chart', [])

.controller('ChartController', function($scope, $state, Main, Chart) {
  
  //
  $scope.refreshChart = function(){
    console.log('list: ', Main.userObject.stocks);
    
    Chart.updateData()
      .then(function(data){
        console.log('chart data: ', data.data);
        // If successful login
        if (data.status === 200) {
          
        } else {
          // Displays login error
          
        }
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
  };

});
