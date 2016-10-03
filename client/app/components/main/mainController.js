
angular.module('StockSight.main', [])

.controller('MainController', function($scope, $state, Main) {
  
  console.log('yo from maincontroller');
  
  $scope.username = '';
  $scope.symbol = [];
  
  $scope.logout = function(){
    Main.logout();
    $state.go('home');
  };
  
  $scope.init = function() {
    console.log('Main controller init ran: ');
    console.log('Main Controller username: ', Main.userObject.username);
    $scope.username = Main.userObject.username;
    $scope.symbol = Main.userObject.symbol;
  }();

});
