'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])
  .controller('adder', ['$scope', '$http', function($scope, $http) {
  	$scope.comics = [];
  	$scope.addBook = function() {
        console.log('helo');
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
        $scope.save = function()  {$http({method: 'POST', url: '/py/record_comics', data: someBook}).
            success(function() {
                // TODO add a dialog for successful save
            }).
            error(function() {
                alert('no');
            })
        };
    };
  }])
  .controller('getComics', ['$scope', '$http', function($scope, $http) {
    $scope.viewComics = (function() {
        $http({method: 'GET', url: '/retrieve_comics'})
        .success(function(data) {
            $scope.data = data;
        })
        .error(function(data, status) {
            alert('error', status, data);
            console.log(data);
        });
    });

  }]);
