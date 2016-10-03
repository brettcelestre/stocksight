
angular.module('StockSight.login.service', [])

.service('Login', function($http, Main) {
  
  // Sends user data to /auth/signup/ route
  var login = function(data) {
    return $http({
      method: 'POST',
      url: '/auth/login',
      data: JSON.stringify(data)
    }).then(function(data) {
      if ( data.status === 200 ) {
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
    login: login
  };
  
});
