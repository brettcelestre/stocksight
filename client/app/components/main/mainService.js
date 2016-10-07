
angular.module('StockSight.main.service', [])

.service('Main', function($http) {
  
  // Stores current users data
  var userObject = {
    username: '',
    stocks: []
  };
  
  // Sends accountInfo to /auth/signup/ route
  var checkSession = function() {
    return $http({
      method: 'GET',
      url: '/auth/checksession',
    }).then(function(data) {
      // Updates Main service userObject
      userObject.username = data.data.user;
      userObject.stocks = data.data.stocks;
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
      // Clears Main service userObject
      userObject.username = '';
      userObject.stocks = [];
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
