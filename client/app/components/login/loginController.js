
angular.module('StockSight.login', [])

.controller('LoginController', function($scope, $state) {
  
  console.log('Login Controller');
  
  $scope.username = '';
  $scope.password = '';
  
  // Submits user / pass to Login API
  $scope.userLogin = function() {
    console.log('userLoger fn name:', $scope.username);
    console.log('userLoger fn password:', $scope.password);
  };
  
  $scope.signupView = function(){
    $state.go('home.signup');
  };

});
