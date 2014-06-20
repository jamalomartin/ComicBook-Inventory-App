'use strict';

console.log('1');
// Declare app level module which depends on filters, and services
angular.module('comicApp', [
  'ngRoute',
  'comicApp.filters',
  'comicApp.services',
  'comicApp.directives',
  'comicApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Home', {templateUrl: 'partials/Home.html', controller: 'getComics'});
  $routeProvider.when('/ComicBooks', {templateUrl: 'partials/ListsOfComics.html', controller: 'getComics'});
  $routeProvider.otherwise({redirectTo: '/Home'});
}]);
