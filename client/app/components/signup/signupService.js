
angular.module('StockSight.signup.service', [])

.service('SignUp', function($http) {
  
  // Sends accountInfo to /auth/signup/ route
  var signup = function(data) {
    console.log('signupService.js data: ', data);
    return $http({
      method: 'POST',
      url: '/signup',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    signup: signup
  };
  
});
