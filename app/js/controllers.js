'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])
  .controller('adder', ['$scope', '$http', 'SaveComic',function($scope, $http, SaveComic) {
    $scope.hideArtist = true;
    $scope.hideWriter = true;
  	$scope.comics = [];
  	$scope.addBook = function() {
        var comicBook = $scope.comics;
        var newpublisher = $scope.publisher;
        var newTitle = $scope.title;
        var newNumber = $scope.booknum;
        var newWriter = $scope.writer;
        var newArtist = $scope.artist;

        // checks for no blank data
        if (newpublisher && newTitle && newNumber ) {
            comicBook.push({
                    publisher:newpublisher,
                    title:newTitle,
                    booknum:newNumber,
                    writer:newWriter,
                    artist:newArtist
            });
        }
        SaveComic.postComicData(comicBook);
        console.log($scope.comics);
    };
}])
  .controller('getComics', ['$scope',  'GetComic', function($scope, GetComic) {
    $scope.comics = [];
    function getComic () {
        GetComic.getComics().then(function(data) {
            $scope.comics = data;
        },
        function(errorMessage) {
            $scope.error=errorMessage;
        });
    };
    getComic();// We call the function on initialization to load the list.
  }])
  .controller('delete', function($scope) {
    $scope.remove = function(item) {
        var index = $scope.comics.indexOf(item);
        $scope.comics.splice(index, 1);
    };
  });
