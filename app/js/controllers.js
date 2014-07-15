'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])

  .run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme.
})
  .controller('adder', ['$scope', '$http', function($scope, $http) {
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
    };
}])

  .controller('getComics', ['$scope',  'GetComic', function($scope, GetComic) {
    $scope.gotComics = [];
    function getComic() {
        GetComic.getComics().then(function(data) {
            $scope.gotComics = data;
        },
        function(errorMessage) {
            $scope.error=errorMessage;
        });
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

  .controller('Sync', ['$scope', 'SaveComic', 'GetComic', function($scope, SaveComic, GetComic) {
      $scope.sync = function() {
          SaveComic.postComicData($scope.comics);
          while($scope.comics.length > 0) {
              $scope.comics.pop();
          };
      };
}]);
