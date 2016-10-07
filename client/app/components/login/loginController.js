
angular.module('StockSight.login', [])

.controller('LoginController', function($scope, $state, Login, Main) {

  $scope.username = '';
  $scope.password = '';
  
  $scope.loginError = 'Your username or password was incorrect.';
  
  $loginError = document.getElementById('login-error');
  
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
          // Stores user data in Main service
          Main.userObject.username = data.data.username;
          Main.userObject.stocks = data.data.stocks;
          // Switches state to main
          $state.go('main');
        } else {
          // Displays login error
          $loginError.setAttribute("style", "display: show;");
        }
      })
      .catch(function(data){
        console.error('Error with login: ', data);
      });
  };
  
  $scope.signupView = function(){
    $state.go('home.signup');
  };
  
  $scope.clearError = function() {
    $loginError.setAttribute("style", "display: none;");
  };

});
