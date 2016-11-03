angular
    .module('myApp', [
        'ngAnimate',
        'ui.router',
        'templates',
        'ngMap'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    /**
     * Routes and States
     */
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        })
        .state('home.venues', {
          url: 'venues', 
          templateUrl: 'venues.html',
          controller: 'VenuesController'
        })
        .state('home.favorites', {
          url: 'favorites',
          templateUrl: 'favorites.html',
          controller: 'FavoritesController'
        })
        .state('home.maps', {
          url: 'maps', 
          templateUrl: 'maps.html', 
          controller: 'MapsController'
        });

    // default fall back route
    $urlRouterProvider.otherwise('/');

   
});