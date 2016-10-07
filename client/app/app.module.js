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