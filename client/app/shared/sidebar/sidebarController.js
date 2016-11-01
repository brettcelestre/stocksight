
angular.module('StockSight.main.sidebar', [])

.controller('SidebarController', function($scope, $rootScope, $state, Stock, Main) {

  // Stores new stock symbol from input
  $scope.symbol = '';
  // Stores users stocks
  $scope.stocks = Main.userObject.stocks;
  // Warning errors
  $scope.duplicateError = '',
  $scope.symbol404 = '';
  $scope.noSymbol = 'Enter stock symbol above.';
  
  // Stores duplicate symbol warning element
  var $duplicate = document.getElementById('duplicate-symbol'),
  // Stores symbol not found warning element
      $symbol404 = document.getElementById('symbol-not-found'),
  // Stores no symbol warning element
      $noSymbol = document.getElementById('no-symbol-string');
  
  $scope.addStock = function() {
    console.log('Add Stock Ran: ', $scope.symbol);
    
    if ( $scope.symbol.length >= 1 ) {

      // Stores request symbol
      var currentSymbol = $scope.symbol,
      // Sets duplicate error flag
          flag = false;
      
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
      
      // If symbol is not already in users collection
      if ( flag === false ) {
        Stock.addStock({'symbol': $scope.symbol})
          .then(function(data) {
            // Success message
            if ( data.statusText == 'Created' ) {
              // Add stock to Main user object stock array
              Main.userObject.stocks.push(data.data.symbol);
              // Clears input
              $scope.symbol = '';
              
              // Check which view user is currently using
              if ( Main.userObject.view === 'chart' ) {
                // Refresh chart view
                $rootScope.$emit('RefreshChart', {});
              } else if ( Main.userObject.view === 'summary' ) {
                // Refreshes summary view
                $rootScope.$emit('RefreshSummary', {});
              }
              
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
    } else {
      // Displays no symbol entered warning
      $noSymbol.setAttribute("style", "display: show;");
    }
  };
  
  $scope.removeStockConfirm = function(symbol) {
    // Selects symbols DOM elements
    var idItem = 'item-' + symbol;
    var $item = document.getElementById(idItem);
    var idRemove = 'remove-' + symbol;
    var $id = document.getElementById(idRemove);
    // Toggles remove symbol button
    if ( $item.classList.value.split(' ').indexOf('remove-item-height') > 0 ) {
      // Shrinks height of stock item
      $item.className = 'stock-item ng-scope';
      // Hides remove button
      $id.setAttribute("style", "display: none;");
    } else {
      // Expands height of stock item
      $item.className += ' remove-item-height';
      // Shows remove button
      $id.setAttribute("style", "display: show;");
    }
  };
  
  $scope.removeStock = function(symbol) {
    // Call removeSymbol API Route
    Stock.removeStock({'symbol': symbol})
      .then(function(data) {
        // Success message

      })
      .catch(function(data) {
        console.error('Error with login: ', data);
      });
      
      // Then Update users symbol array in Main service
  };
  
  // Clears error warnings on input change
  $scope.clearWarnings = function() {
    $scope.duplicateError = '',
    $scope.symbol404 = '';
    $noSymbol.setAttribute("style", "display: none;");
    $symbol404.setAttribute("style", "display: none;");
    $duplicate.setAttribute("style", "display: none;");
  };

});
