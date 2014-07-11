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
  .controller('editModal', function($scope, $modal, $log) {
    $scope.open = function() {
        console.log($scope.comics);
        var modalInstance = $modal.open({
            templateUrl: 'partials/editModal.html',
            controller: 'ModalController',
            resolve: {comics: function() {return $scope.comics;}}
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
})
  .controller('ModalController', function($scope, $modalInstance, comics) {
    $scope.comics = comics
    $scope.ok = function() {
        $modalInstance.close($scope.selected);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
