
angular.module('StockSight.signup', [])

.controller('SignupController', function($scope, $state, SignUp) {

  $scope.username = '';
  $scope.passwordOne = '';
  $scope.passwordTwo = '';
  
  $entryError = document.getElementById('entry-error');
  $passwordError = document.getElementById('password-error');
  $usernameError = document.getElementById('username-error');
  
  // Submits user / pass to Login API
  $scope.createAccount = function() {
    // Verifies username was entered
    if ( $scope.username.length < 1 ) {
      $entryError.setAttribute("style", "display: show;");
    // Verifies passwords match
    } else if ( $scope.passwordOne === $scope.passwordTwo ) {
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
          } else {
            // Display 'Username already taken'
            alert('sorry something went wrong');
            $signUpError.setAttribute("style", "display: show;");
          }
        })
        .catch(function(data) {
          console.error('Error with login: ', data);
        });
      // Clears input models
      $scope.username = '';
      $scope.passwordOne = '';
      $scope.passwordTwo = '';
    } else {
    // Passwords do not match error
      $passwordError.setAttribute("style", "display: show;");
    }
  };
  
  $scope.loginView = function(){
    $state.go('home.login');
  };

  $scope.clearError = function() {
    $entryError.setAttribute("style", "display: none;");
    $usernameError.setAttribute("style", "display: none;");
    $passwordError.setAttribute("style", "display: none;");
  };

});
