
angular.module('StockSight.main', [])

.controller('MainController', function($scope, $state, Main) {
  
  $scope.username = '';
  
  $scope.logout = function(){
    Main.logout()
      .then(function(){
        $state.go('home');
      });
  };
  
  $scope.init = function() {
    $scope.username = Main.userObject.username;
  }();

});
