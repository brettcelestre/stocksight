
angular.module('StockSight.login', [])

.controller('LoginController', function($scope, $state, Login, Main) {

  $scope.username = '';
  $scope.password = '';
  
  // Submits user / pass to Login API
  $scope.userLogin = function() {
    // Creates data object for API call
    var userData = {
      username: $scope.username,
      password: $scope.password
    };
    // Calls login service and sends user data
    Login.login(userData)
      .then(function(data){
        // If successful login
        if (data.status === 200) {
          // Switches state to main
          $state.go('main');
        } else {
          // Display error
        }
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
    
    
  };
  
  $scope.signupView = function(){
    $state.go('home.signup');
  };

});
