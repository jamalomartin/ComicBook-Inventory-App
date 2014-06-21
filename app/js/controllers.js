'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])
  .controller('adder', ['$scope', '$http', function($scope, $http) {
  	$scope.comics = [];
  	$scope.addBook = function() {
        console.log('hello');
        var someBook = $scope.comics;
        var newpublisher = $scope.publisher;
        var newTitle = $scope.title;
        var newNumber = $scope.booknum;
        var oldcomics = null;

        // checks for no blank data
        if (newpublisher && newTitle && newNumber ) {
            angular.forEach ($scope.comics, function (eachcomic) {
                if (// checks for no duplicate data
                    (newpublisher.toLowerCase() === eachcomic.publisher.toLowerCase()) &&
                    (newTitle.toLowerCase() === eachcomic.title.toLowerCase()) &&
                    (newNumber === eachcomic.booknum)) {
                    oldcomics = true;
                }
            });
            if (!oldcomics) {
                someBook.push({publisher:newpublisher, title:newTitle, booknum:newNumber});
            }
        }
        $http({method: 'POST', url: '/py/record_comics', data: someBook}).
            success(function() {
                // TODO add a dialog for successful save
            }).
            error(function() {
                alert('no');
            })
    };
  }])
  .controller('getComics', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    function getComic() {
        $http({method: 'GET', url: '/py/retrieve_comics'})
        .success(function(comics) {
            $scope.data = comics;
        })
        .error(function(data, status) {
            alert('error', status, data);
            console.log(data);
        });
    };
    getComic();// We call the function on initialization to load the list.
    
    // $interval runs the given function every X millisec (2nd arg)
    $interval(function() {
        getComic();
        console.log('Hello');
    },1000);
  }]);
