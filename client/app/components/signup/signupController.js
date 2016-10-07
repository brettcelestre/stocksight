
angular.module('StockSight.signup', [])

.controller('SignupController', function($scope, $state, SignUp) {

  $scope.username = '';
  $scope.passwordOne = '';
  $scope.passwordTwo = '';
  
  // Submits user / pass to Login API
  $scope.createAccount = function() {
    if ( $scope.passwordOne === $scope.passwordTwo ) {
      // Creates account info object
      var accountInfo = {
        username: $scope.username,
        password: $scope.passwordOne
      };  
      // Sends accountInfo through /auth/signup
      SignUp.signup(accountInfo)
        .then(function(data) {
          // Success message
          if ( data.statusText == 'Created' ) {
            // Change State to Questions / or quick tour slides
            $state.go('main');
          // Failure message
            // TODO
          } else {
            // Display 'Username already taken'
            alert('sorry something went wrong');
          }
        })
        .catch(function(data) {
          console.error('Error with login: ', data);
        });
      // Clears input models
      $scope.username = '';
      $scope.passwordOne = '';
      $scope.passwordTwo = '';
    }
  };
  
  $scope.loginView = function(){
    $state.go('home.login');
  };

});
