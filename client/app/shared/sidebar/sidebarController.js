
angular.module('StockSight.main.sidebar', [])

.controller('SidebarController', function($scope, $state, Stock, Main) {

  // Stores new stock symbol from input
  $scope.symbol = '';
  
  $scope.addStock = function() {
    console.log('Add Stock Ran: ', $scope.symbol);
    // Stores request symbol
    var currentSymbol = $scope.symbol;
    
    // Check to see if user already has that stock in their list
    // if ( $scope.symbol === Main.userObject.symbol.currentSymbol) {
      // If they already exists in that users collection display alert
        // TODO
    // } else {
    
      Stock.addStock({'symbol': $scope.symbol})
        .then(function(data) {
            console.log('after api call data: ', data);
            
            // Success message
            if ( data.statusText == 'Created' ) {
              
            // Failure message
              // TODO
            } else {
              // Display 'Sorry we were unable to find that symbol.'

            }
          })
          .catch(function(data) {
            console.error('Error with login: ', data);
          });  
      // Clears input
      $scope.symbol = '';
    
    // }
    
  };

});
