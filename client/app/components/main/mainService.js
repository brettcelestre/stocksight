
angular.module('StockSight.main.service', [])

.service('Main', function($http) {
  
  // Stores current users data
  var userObject = {
    username: '',
    symbol: []
  };
  
  // Sends accountInfo to /auth/signup/ route
  var checkSession = function(data) {
    return $http({
      method: 'GET',
      url: '/auth/checksession',
    }).then(function(data) {
      // Updates Main service userObject
      userObject.username = data.data.user;
      userObject.symbol = data.data.symbol;
      return data;
    }, function(error) {
      return error;
    });
  };
  
  var logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout'
    }).then(function(data){
      return data;
    }, function(error) {
      return error; 
    });
  };

  return {
    userObject: userObject,
    checkSession: checkSession,
    logout: logout
  };
  
});
