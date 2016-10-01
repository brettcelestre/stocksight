
angular.module('appRoutes', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  // Initialize home route
  $urlRouterProvider.when('', '/');
  // Default route
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    
    // Home state config
    .state('home', {
      url: '/',
      views: {
        'home': {
          templateUrl: 'app/components/home/homeView.html',
          controller: 'HomeController'   
        }
      }
    })
    
    // Sign up state config
    .state('signup', {
      url: '/signup',
      views: {
        'home': {
          templateUrl: 'app/components/signup/signupView.html',
          controller: 'SignUpController'
        }
      }
    })
    
    .state('main', {
      url: '/main',
      views: {
        'main': {
          templateUrl: 'app/components/main/mainView.html',
          controller: 'MainController'
        }
      }
    })
    
}])

.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {

}]);