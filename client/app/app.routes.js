
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
      // Sets default children ui-views to home.login
      params: { 
        autoActivateChild: 'home.login'
      },
      views: {
        'main': {
          templateUrl: 'app/components/home/homeView.html',
          controller: 'HomeController'   
        }
      }
    })
    
    // Login state config
    .state('home.login', {
      parent: 'home',
      url: '/login',
      views: {
        'portal': {
          templateUrl: 'app/components/login/loginView.html',
          controller: 'LoginController'
        }
      }
    })
    
    // Sign up state config
    .state('home.signup', {
      parent: 'home',
      url: '/signup',
      views: {
        'portal': {
          templateUrl: 'app/components/signup/signupView.html',
          controller: 'SignupController'
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

.run(['$rootScope', '$state', '$stateParams', 'Main',
  function ($rootScope, $state, $stateParams, Main) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    // Listens and invokes anonymous function each for any state change
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      var aac;
      if(aac = toState && toState.params && toState.params.autoActivateChild) {
        $state.go(aac);
      }
    });
    
    // Checks to verify whether someone is logged in
    Main.checkSession()
      .then(function(data) {
        // If someone is logged in
        if (data.data.user) {
          console.log('You are logged in as: ', data.data.user);
          // Switches state to main
          $state.go('main');
        }
      });
      
}]);
