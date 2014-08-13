'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])

  .run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme.
})
  .controller('adder', ['$scope', '$http', 'GetComic', 'SaveComic', '$timeout' ,function($scope, $http, GetComic, SaveComic, $timeout) {
    $scope.gotComics = [];
    function getComic() {
        GetComic.getComics().then(function(data) {
            $scope.gotComics = data;
        },
        function(errorMessage) {
            $scope.error=errorMessage;
        });
    }

    $scope.hideArtist = true;
    $scope.hideWriter = true;
    $scope.hideMisc = true;
  	$scope.comics = [];
    
  	$scope.addBook = function() {
        var comicBook = $scope.comics;
        var newpublisher = $scope.publisher;
        var newTitle = $scope.title;
        var newNumber = $scope.booknum;
        var newWriter = $scope.writer;
        var newArtist = $scope.artist;
        var newMisc = $scope.misc;

        // checks for no blank data
        if (newpublisher && newTitle) {
            comicBook.push({
                    publisher:newpublisher,
                    title:newTitle,
                    booknum:newNumber,
                    writer:newWriter,
                    artist:newArtist,
                    misc:newMisc
            });
        }

        $scope.publisher = null;
        $scope.title = null;
        $scope.booknum = null;
        $scope.writer = null;
        $scope.artist = null;
        $scope.misc = null;
        
    };
    $scope.sync = function() {
      SaveComic.postComicData($scope.comics);
      $scope.comics = [];
      $timeout(function() {getComic();}, 1000);
    };
    getComic();// We call the function on initialization to load the list.
}])

  .controller('delete', function($scope) {
    $scope.remove = function() {
        $scope.comics.splice(this.$index, 1);
    };
  })

  .controller('EditCtrl', function($scope) {
    $scope.comics;
  })

  .controller('serverDelete', function($scope, $timeout, DeleteComic) {
    $scope.ok = function(comic) {
        DeleteComic.deleteComic(comic);
        var index = -1;
        for (var i = 0; i < $scope.gotComics.length; i++){
          if ($scope.gotComics[i].key === comic.key) {
            index = i;
          }
        }
        if (index > -1) {
          $scope.gotComics.splice(index, 1);
        }
    };
  });
