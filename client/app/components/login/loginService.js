
angular.module('StockSight.login.service', [])

.service('Login', function($http) {
  
  // Sends user data to /auth/signup/ route
  var login = function(data) {
    console.log('loginService.js data: ', data);
    return $http({
      method: 'POST',
      url: '/auth/login',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    login: login
  };
  
});
