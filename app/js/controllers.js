'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])

  .run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme.
})
  .controller('adder', ['$scope', '$http', 'SaveComic' ,function($scope, $http, SaveComic) {
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

          SaveComic.postComicData(comicBook);
        }
        $scope.publisher = null;
        $scope.title = null;
        $scope.booknum = null;
        $scope.writer = null;
        $scope.artist = null;
        
    };
}])

  .controller('getComics', ['$scope',  'GetComic', 'SaveComic', function($scope, GetComic, SaveComic) {
    $scope.gotComics = [];
    function getComic() {
        GetComic.getComics().then(function(data) {
            $scope.gotComics = data;
        },
        function(errorMessage) {
            $scope.error=errorMessage;
        });
    };
    $scope.sync = function() {
          while($scope.comics.length > 0) {
              $scope.comics.pop();
          };
         setTimeout(function() {
           getComic();
         }, 0);
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

  .controller('serverDelete', function($scope, DeleteComic) {
    $scope.ok = function(comic) {
        DeleteComic.deleteComic(comic);

    };
  });
