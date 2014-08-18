'use strict';

// Declare app level module which depends on filters, and services
angular.module('comicApp', [
  'xeditable',
  'ui.bootstrap',
  'ngRoute',
  'comicApp.filters',
  'comicApp.services',
  'comicApp.directives',
  'comicApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ComicBooks', {templateUrl: 'partials/ListsOfComics.html', controller: 'adder'});
  $routeProvider.otherwise({redirectTo: '/ComicBooks'});
}]);
