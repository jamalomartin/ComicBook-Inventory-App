'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('comicApp.controllers'));


  it('should ....', inject(function($controller) {
    //spec body
    var adder = $controller('adder', { $scope: {} });
    expect(adder).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var getComics = $controller('getComics', { $scope: {} });
    expect(getComics).toBeDefined();
  }));
});
