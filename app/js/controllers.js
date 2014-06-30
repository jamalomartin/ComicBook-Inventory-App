'use strict';

/* Controllers */

angular.module('comicApp.controllers', ['ngGrid'])
  .controller('adder', ['$scope', '$http', 'SaveComic',function($scope, $http, SaveComic) {
    // $scope.hideArtist = true;
    // $scope.hideWriter = true;
  	var comics = [];
    $scope.gridOptions = {
        data: 'comicBook',
        rowHeight: 18,
        enablePinning: true,
        columnDefs: [{ field: "publisher", pinned: true },
                    { field: "title"},
                    { field: "booknum"},
                    { field: "writer"},
                    { field: "artist"}]
    };
  	$scope.addBook = function() {
        $scope.comicBook = comics;
        var newpublisher = $scope.publisher;
        var newTitle = $scope.title;
        var newNumber = $scope.booknum;
        var newWriter = $scope.writer;
        var newArtist = $scope.artist;

        // checks for no blank data
        if (newpublisher && newTitle && newNumber ) {
            $scope.comicBook.push({
                    publisher:newpublisher,
                    title:newTitle,
                    booknum:newNumber,
                    writer:newWriter,
                    artist:newArtist
            });
        }
        // SaveComic.postComicData(comicBook);
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
    $scope.get = {
        data: 'comics',
        rowHeight: 18,
        enablePinning: true,
        columnDefs: [{ field: "publisher", pinned: true },
                    { field: "title"},
                    { field: "booknum"},
                    { field: "writer"},
                    { field: "artist"}]
    };
  }]);
