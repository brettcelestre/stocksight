
angular.module('StockSight.main', [])

.controller('MainController', function($scope, $state, Main) {
  
  console.log('yo from maincontroller');
  
  $scope.username = '';
  $scope.symbol = [];
  
  $scope.logout = function(){
    Main.logout()
      .then(function(){
        $state.go('home');
      });
  };
  
  $scope.init = function() {
    $scope.username = Main.userObject.username;
    $scope.symbol = Main.userObject.symbol;
  }();

});
