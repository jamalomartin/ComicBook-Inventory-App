'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])
  .controller('adder', ['$scope', '$http', function($scope, $http) {
    $scope.hideArtist = true;
    $scope.hideWriter = true;
  	$scope.comics = [];
  	$scope.addBook = function() {
        var someBook = $scope.comics;
        var newpublisher = $scope.publisher;
        var newTitle = $scope.title;
        var newNumber = $scope.booknum;
        var newWriter = $scope.writer;
        var newArtist = $scope.artist;

        // checks for no blank data
        if (newpublisher && newTitle && newNumber ) {
                someBook.push(
                    {
                        publisher:newpublisher,
                        title:newTitle,
                        booknum:newNumber,
                        writer:newWriter,
                        artist:newArtist
                    });
        }
        $http({method: 'POST', url: '/py/record_comics', data: someBook}).
            success(function() {
                // TODO add a dialog for successful save
            }).
            error(function() {
                alert('no');
            });

    };
}])
  .controller('getComics', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    function getComic() {
        $http({method: 'GET', url: '/py/retrieve_comics'})
        .success(function(comics) {
            $scope.data = comics;
        })
        .error(function(data, status) {
            console.log(data);
        });
    };
    getComic();// We call the function on initialization to load the list.

    // $interval runs the given function every X millisec (2nd arg)
    $interval(function() {
        getComic();
    },1000);
  }]);
