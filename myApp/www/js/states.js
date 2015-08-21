myBusLine.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

$urlRouterProvider.otherwise('/')

 $stateProvider.state('home', {
   url: '/',
   controller: 'homeCtrl',
   templateUrl: 'templates/home.html'
 }),
 $stateProvider.state('lines', {
   url: '/lines',
   controller: 'busLinesCtrl',
   templateUrl: 'templates/lines.html'
 }),
 $stateProvider.state('favorites', {
   url: '/favorites',
   controller: 'favoritesCtrl',
   templateUrl: 'templates/favoriteLines.html'
 }),
 $stateProvider.state('location', {
   url: '/location',
   //controller: 'busLineCtrl',
   templateUrl: 'templates/atLocation.html'
 }),
 $stateProvider.state('alarm', {
   url: '/alarm',
   //controller: 'busLineCtrl',
   templateUrl: 'templates/alarmMe.html'
 }),
 $stateProvider.state('about', {
   url: '/about',
   controller: 'aboutCtrl',
   templateUrl: 'templates/about.html'
 }),
 $stateProvider.state('line', {
   url: '/line/:lineId',
   controller: 'busLineCtrl',
   templateUrl: 'templates/line.html'
 }),
 $stateProvider.state('map', {
   url: '/map',
   controller: 'mapCtrl',
   templateUrl: 'templates/map.html'
 }),
 $stateProvider.state('favorites-settings', {
   url: '/favorites/settings',
   controller: 'favoritesCtrl',
   templateUrl: 'templates/favorites-settings.html'
 })

});
