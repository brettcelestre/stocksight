
angular.module('StockSight.main.sidebar', [])

.controller('SidebarController', function($scope, $state, Stock, Main) {

  // Stores new stock symbol from input
  $scope.symbol = '';
  // Stores users stocks
  $scope.stocks = Main.userObject.stocks;
  // Warning errors
  $scope.duplicateError = '',
  $scope.symbol404 = '';
  
  $scope.addStock = function() {
    console.log('Add Stock Ran: ', $scope.symbol);
    
    // Stores request symbol
    var currentSymbol = $scope.symbol,
    // Sets duplicate error flag
        flag = false,
    // Stores duplicate symbol warning element
        $duplicate = document.getElementById('duplicate-symbol'),
    // Stores symbol not found warning element
        $symbol404 = document.getElementById('symbol-not-found');
    
    // Hides error warnings
    $duplicate.setAttribute("style", "display: none;");
    $symbol404.setAttribute("style", "display: none;");
    
    // Check to see if this user already has that stock in their collection
    Main.userObject.stocks.forEach(function(val){
      if ( currentSymbol.toUpperCase() === val ){
        flag = true;
        // Displays Duplicate Error
        $scope.duplicateError = 'You already have ' + val + ' in your collection.';
        $duplicate.setAttribute("style", "display: show;");
      }
    });
    
    if ( flag === false ) {
      Stock.addStock({'symbol': $scope.symbol})
        .then(function(data) {
          // Success message
          if ( data.statusText == 'Created' ) {
            // Add stock to Main user object stock array
            Main.userObject.stocks.push(data.data.symbol);
            // Clears input
            $scope.symbol = '';
          } else {
          // Failure message
            $scope.symbol404 = 'Could not find ' + $scope.symbol;
            // Displays Symbol Not Found warning
            $symbol404.setAttribute("style", "display: show;");
          }
        })
        .catch(function(data) {
          console.error('Error with login: ', data);
        });  
    }
  };
  
  // Clears error warnings on input change
  $scope.clearWarnings = function() {
    $scope.duplicateError = '',
    $scope.symbol404 = '';
  };

});
