
angular.module('StockSight.signup.service', [])

.service('SignUp', function($http, Main) {
  
  // Sends accountInfo to /auth/signup/ route
  var signup = function(data) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: JSON.stringify(data)
    }).then(function(data) {
      if ( data.statusText === 'Created' ) {
        // Stores user data in Main service
        Main.userObject.username = data.data.username;
        Main.userObject.symbol = data.data.symbol;
      }
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    signup: signup
  };
  
});
