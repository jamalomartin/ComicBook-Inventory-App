'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('comicApp.directives'));

  describe('app-version', function() {
    xit('should print current version', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        xexpect(element.text()).toEqual('TEST_VER');
      });
    });
  });
});
