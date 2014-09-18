'use strict';

/* Controllers */

angular.module('comicApp.controllers', [])

  .run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme.
})
  .controller('adder', ['$scope', '$http', 'GetComic', 'SaveComic', '$timeout', '$window',
    function($scope, $http, GetComic, SaveComic, $timeout, $window) {

    $scope.gotComics = [];

    //detect mobile
    function detectmod() {
      if ($window.navigator.userAgent.match(/iPad/i)
        || $window.navigator.userAgent.match(/iPhone/i)
        || $window.navigator.userAgent.match(/Android/i)) {
        $timeout(function() {
          $('.checkbox').trigger('click');
        },0);
      };
    }

    function autoCompleteTitle(autoTitleComplete) {
      $scope.titles = [
                      'A+X',
                      'Action Comics',
                      'The Adventures of Superman',
                      'All-Star Western',
                      'American Vampire',
                      'Aquaman',
                      'Aquaman and the Others',
                      'Arrow',
                      'Astro City',
                      'Avengers',
                      'Avengers A.I.',
                      'Avengers Undercover',
                      'Avengers World',
                      'Avengers: Heroes Welcome',
                      'Avengers: The Enemy Within',
                      'Avenging Spider-Man',
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
                      'Black Bolt: Something Inhuman This Way Comes',
                      'Black Widow',
                      'Black Widow: Deadly Origin',
                      'Bodies',
                      'Brilliant',
                      'Cable and X-Force',
                      'Captain America',
                      'Captain America: Homecoming',
                      'Captain America: Living Legend',
                      'Captain Marvel',
                      'Captain Universe: The Hero Who Could Be You',
                      'Cyclops',
                      'Catwoman',
                      'Coffin Hill',
                      'Constantine',
                      'Daredevil',
                      'Daredevil: Dark Nights',
                      'Dark Tower',
                      'Dead Boy Detectives',
                      'Deadly Hands of Kung Fu',
                      'Detective Comics',
                      'Disney Kingdoms',
                      'Earth',
                      'Elektra',
                      'Fables',
                      'Fairest',
                      'Fantastic Four',
                      'Fantomex Max',
                      'Fearless Defenders',
                      'FF',
                      'Figment',
                      'The Flash',
                      'Gambit',
                      'Guardians of the Galaxy',
                      'Guardians of the Galaxy: Tomorrows Avengers ',
                      'Grayson',
                      'Green Arrow',
                      'Green Lantern',
                      'Green Lantern: New Guardians',
                      'Green Lantern Corps',
                      'Harley Quinn',
                      'He-Man & the Masters of the Universe',
                      'Hinterkind',
                      'Hulk',
                      'Infinity Man and the Forever People',
                      'Inhuman',
                      'Injustice',
                      'Iron Fist: The Living Weapon',
                      'Iron Man',
                      'Iron Patriot',
                      'Journey Into Mystery',
                      'Justice League',
                      'Justice League 3000',
                      'Justice League Dark',
                      'Justice League United',
                      'Kick-Ass 3',
                      'Larfleeze',
                      'Legends of the Dark Knight',
                      'Legends of the Dark Knight(Vol. 2)',
                      'Legendary Star-Lord',
                      'Looney Tunes',
                      'Loki: Agent of Asgard',
                      'Lot 13',
                      'Mad Magazine',
                      'Magneto',
                      'Marvel Knights: Hulk',
                      'Marvel Knights: Spider-Man',
                      'Marvel Knights: X-Men',
                      'Marvel Universe Avengers Assemble',
                      'Mighty Avengers',
                      'Miracleman',
                      'Moon Knight',
                      'Morbius: The Living Vampire',
                      'Ms. Marvel',
                      'The New 52: Futures End 2014-2015',
                      'New Avengers',
                      'New Warriors',
                      'New Suicide Squad',
                      'Nightcrawler',
                      'Nova',
                      'PAINKILLER JANE: THE 22 BRIDES',
                      'Punisher: Nightmare',
                      'Red Hood and the Outlaws',
                      'Red Lanterns',
                      'Revolutionary War',
                      'Road to Oz',
                      'Rocket Raccoon',
                      'The Royals: Masters of War',
                      'Savage Hulk',
                      'Savage Wolverine',
                      'The Sandman: Overture 2013-2014',
                      'Secret Avengers',
                      'Scooby-Doo',
                      'Scooby-Doo Team-Up',
                      'Scribblenauts Unmasked: A Crisis of Imagination',
                      'Secret Origins',
                      'S.H.I.E.L.D. Origins',
                      'She-Hulk',
                      'Sinestro',
                      'Silver Surfer',
                      'Smallville Season 11:Lantern 2014-2014',
                      'Spider-Man',
                      'Spider-Man 2099',
                      'Spider-Man Spectacular',
                      'Superior Spider-Man Team-Up',
                      'Star Spangled War Stories Featuring G.I. Zombie',
                      'Storm',
                      'Suiciders',
                      'Superboy',
                      'Supergirl',
                      'Superior Spider-Man',
                      'Superman',
                      'Superman/Wonder Woman',
                      'Superman Unchained',
                      'Survive!',
                      'Swamp Thing',
                      'Teen Titans',
                      'Teen Titans Go!',
                      'The Emerald City of Oz',
                      'Tiny Titans: Back to the Treehouse 2014-2014',
                      'Trinity of Sin: Pandora',
                      'Trinity of Sin: Phantom Stranger',
                      'The Punisher',
                      'The Superior Foes of Spider-Man',
                      'The Unwritten: Apocalypse',
                      'The Vampire Diaries',
                      'Thor: God of Thunder',
                      'Thunderbolts',
                      'Ultimate Comics Spider-Man',
                      'Ultimate Comics Ultimates',
                      'Ultimate Comics Wolverine',
                      'Ultimate Comics X-Men',
                      'Ultimate FF',
                      'Uncanny Avengers',
                      'Uncanny X-Force',
                      'Uncanny X-Men',
                      'Venom',
                      'Winter Soldier',
                      'Winter Soldier: The Bitter March',
                      'Wolverine & the X-Men',
                      'Wolverine',
                      'Wolverine: In The Flesh',
                      'Wonder Woman',
                      'Worlds Finest',
                      'X-Force',
                      'X-Men',
                      'X-Men Legacy'
                    ];
      autoTitleComplete.forEach(function(value) {
        if ($scope.titles.indexOf(value) == -1) {
          $scope.titles.push(value);
        }
      });
      return $scope.titles;
    }

    function autoCompletePublisher(autoPublisherComplete) {
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

      autoPublisherComplete.forEach(function(value) {
        if ($scope.publishers.indexOf(value) == -1) {
          $scope.publishers.push(value);
        }
      });
      return $scope.publishers;
    }

    function autoCompleteWriter(autoWriterComplete) {
      $scope.nonDupeWriter = [];
      autoWriterComplete.forEach(function(value) {
        if ($scope.nonDupeWriter.indexOf(value) == -1) {
          $scope.nonDupeWriter.push(value);
        }
      });
      return $scope.nonDupeWriter;
    }


    function autoCompleteArtist(autoArtistComplete) {
      $scope.nonDupeArtist = [];
      autoArtistComplete.forEach(function(value) {
        if ($scope.nonDupeArtist.indexOf(value) == -1) {
          $scope.nonDupeArtist.push(value);
        }
      });
      return $scope.nonDupeArtist;
    }

    function getComic() {
        GetComic.getComics().then(function(data) {
          $scope.gotComics = data;
          var autoPublisherComplete = [];
          var autoTitleComplete = [];
          var autoWriterComplete = [];
          var autoArtistComplete = [];
          for (var i = 0; i < data.length; i++) {
            autoPublisherComplete.push(data[i].publisher);
            autoTitleComplete.push(data[i].title);
            autoWriterComplete.push(data[i].writer);
            autoArtistComplete.push(data[i].artist);
          }
          autoCompletePublisher(autoPublisherComplete);
          autoCompleteTitle(autoTitleComplete);
          autoCompleteWriter(autoWriterComplete);
          autoCompleteArtist(autoArtistComplete);
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

    detectmod(); 
    getComic(); // We call the function on initialization to load the list.
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
