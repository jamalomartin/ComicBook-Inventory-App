'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {

  beforeEach(module('comicApp'));

  describe('adder', function() {
    var scope;
    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller('adder', {
        $scope: scope
      });
    }));

    it('should ....', function() {
      expect(scope.addBook).toBeDefined();
    });
  })


  

  // it('should ....', inject(function($controller) {
  //   //spec body
  //   var getComics = $controller('getComics', { $scope: {} });
  //   expect(getComics).toBeDefined();
  // }));
});
