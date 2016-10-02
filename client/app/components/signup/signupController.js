
angular.module('StockSight.signup', [])

.controller('SignupController', function($scope, $state, SignUp) {

  $scope.username = '';
  $scope.passwordOne = '';
  $scope.passwordTwo = '';
  
  // Submits user / pass to Login API
  $scope.createAccount = function() {
    console.log('username fn name:', $scope.username);
    console.log('password one fn password:', $scope.passwordOne);
    console.log('password two password:', $scope.passwordOne);
    if ( $scope.passwordOne === $scope.passwordTwo ) {
      console.log('passwords are the same');
    
      // Creates account info object
      var accountInfo = {
        username: $scope.username,
        password: $scope.passwordOne
      };  
      // Sends accountInfo through /auth/signup
      SignUp.signup(accountInfo)
        .then(function(data) {
          console.log('signupController.js data from api: ', data);
          
          // // Success message
          // if ( data.statusText == 'Created' ) {
          //   // Change State to Questions / or quick tour slides
          //   $state.go('main');
          // // Failure message
          // } else {
          //   // Display 'Username already taken'
          //   alert('sorry something went wrong');
          // }
            
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
