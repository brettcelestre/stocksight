
angular.module('StockSight.main.service', [])

.service('Main', function($http) {
  
  // Stores current users data
  var userObject = {
    username: '',
    stocks: [],
    view: 'chart'
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
  
  // Delete Stock from userObject
  var deleteStock = function(symbol){
    for ( var i = userObject.stocks.length-1; i >= 0; i-- ) {
      if ( userObject.stocks[i] === symbol) {
        userObject.stocks.splice(i, 1);
      }
    }
  };

  return {
    userObject: userObject,
    checkSession: checkSession,
    logout: logout,
    deleteStock: deleteStock
  };
  
});
