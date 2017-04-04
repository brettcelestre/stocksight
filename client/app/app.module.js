// var loginservice = require('./components/login/loginService.js');
// var signupservice = require('./components/signup/signupService.js');
// var mainService = require('./components/main/mainService.js');
// var homeController = require('./components/home/homeController.js');
// var loginController = require('./components/login/loginController.js');
// var signupController = require('./components/signup/signupController.js');
// var mainController = require('./components/main/mainController.js');
// var sidebarController = require('./shared/sidebar/sidebarController.js');
// var sidebarService = require('./shared/sidebar/sidebarService.js');
// var chartController = require('./shared/chart/chartController.js');
// var chartService = require('./shared/chart/chartService.js');
// var routes = require('./app.routes.js');

angular.module('StockSight', [
  'ui.router',
  'appRoutes',
  'StockSight.home',
  'StockSight.login',
  'StockSight.login.service',
  'StockSight.signup',
  'StockSight.signup.service',
  'StockSight.main.service',
  'StockSight.main',
  'StockSight.main.chart',
  'StockSight.main.chart.service',
  'StockSight.main.sidebar',
  'StockSight.main.stock'
]);
