'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])

  .run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme.
})
  .controller('adder', ['$scope', '$http', 'GetComic', 'SaveComic', '$timeout',
    function($scope, $http, GetComic, SaveComic, $timeout) {

    $scope.gotComics = [];

    $scope.publishers = [
                          'Marvel',
                          'DC',
                          'Image',
                          'Dark Horse',
                          'IDW',
                          'Viz Media',
                          'Oni Press',
                          'Dynamite Entertainment'
                          ];

    $scope.titles = [
                      'Action Comics',
                      'The Adventures of Superman',
                      'All-Star Western',
                      'American Vampire',
                      'Aquaman',
                      'Aquaman and the Others',
                      'Arrow',
                      'Astro City',
                      'Batgirl',
                      'Batman',
                      'Batman 66',
                      'Batman: Arkham Unhinged',
                      'Batman: Eternal 2014-2015',
                      'Batman/Superman',
                      'Batman and Robin',
                      'Batman Beyond Universe',
                      'Batwing',
                      'Batwoman',
                      'Birds of Prey',
                      'Bodies',
                      'Catwoman',
                      'Coffin Hill',
                      'Constantine',
                      'Dead Boy Detectives',
                      'Detective Comics',
                      'Earth',
                      'Fables',
                      'Fairest',
                      'The Flash',
                      'Grayson',
                      'Green Arrow',
                      'Green Lantern',
                      'Green Lantern: New Guardians',
                      'Green Lantern Corps',
                      'Harley Quinn',
                      'He-Man & the Masters of the Universe',
                      'Hinterkind',
                      'Infinity Man and the Forever People',
                      'Injustice',
                      'Justice League',
                      'Justice League 3000',
                      'Justice League Dark',
                      'Justice League United',
                      'Larfleeze',
                      'Legends of the Dark Knight',
                      'Legends of the Dark Knight(Vol. 2)',
                      'Looney Tunes',
                      'Lot 13',
                      'Mad Magazine',
                      'The New 52: Futures End 2014-2015',
                      'New Suicide Squad',
                      'Red Hood and the Outlaws',
                      'Red Lanterns',
                      'The Royals: Masters of War',
                      'The Sandman: Overture 2013-2014',
                      'Scooby-Doo',
                      'Scooby-Doo Team-Up',
                      'Scribblenauts Unmasked: A Crisis of Imagination',
                      'Secret Origins',
                      'Sinestro',
                      'Smallville Season 11:Lantern 2014-2014',
                      'Star Spangled War Stories Featuring G.I. Zombie',
                      'Suiciders',
                      'Superboy',
                      'Supergirl',
                      'Superman',
                      'Superman/Wonder Woman',
                      'Superman Unchained',
                      'Swamp Thing',
                      'Teen Titans',
                      'Teen Titans Go!',
                      'Tiny Titans: Back to the Treehouse 2014-2014',
                      'Trinity of Sin: Pandora',
                      'Trinity of Sin: Phantom Stranger',
                      'The Unwritten: Apocalypse',
                      'The Vampire Diaries',
                      'Wonder Woman',
                      'Worlds Finest'
                    ]

    function getComic() {
        GetComic.getComics().then(function(data) {
            $scope.gotComics = data;
        },
        function(errorMessage) {
            $scope.error=errorMessage;
        });
    }

    $scope.collection = '-publisher';
    $scope.entries = '-title';
    $scope.model = '-booknum';
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
  })
  
  .controller('ComicList', function($scope, $http) {
    $scope.url = '';
    $scope.list = [];


  })
