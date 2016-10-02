
angular.module('StockSight.login', [])

.controller('LoginController', function($scope, $state, Login) {

  $scope.username = '';
  $scope.password = '';
  
  // Submits user / pass to Login API
  $scope.userLogin = function() {
    // Creates data object for API call
    var userData = {
      username: $scope.username,
      password: $scope.password
    };
    console.log('Login user data: ', userData);
    // Calls login service and sends user data
    Login.login(userData)
      .then(function(data){
        console.log('Login.login .then data: ', data);
        
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
    
    
  };
  
  $scope.signupView = function(){
    $state.go('home.signup');
  };

});
