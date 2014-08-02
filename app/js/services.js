'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('comicApp.services', [])
  .service('SaveComic', function($http) {
  	this.postComicData = function(comicBook) {
  		$http({
  			method:'POST',
  			url: '/py/record_comics',
  			data: comicBook,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  		});
  	}
})
  .service('GetComic', function($http, $q) {
  	this.getComics = function() {
  		var deferred = $q.defer();
  		$http({
  			method: 'GET',
  			url: '/py/retrieve_comics'
  		}).
  		success(function (data, status, header, config) {
  			deferred.resolve(data);
  		}).
  		error(function (data, status) {
  			deferred.reject(data);
  		});
  		return deferred.promise;
  	}  
})
  .service('DeleteComic', function($http) {
    this.deleteComic = function(comic) {
      console.log(comic.key);
      $http({
        method: 'DELETE',
        url: '/py/delete_comic/' + comic.key
      });
    }
  });