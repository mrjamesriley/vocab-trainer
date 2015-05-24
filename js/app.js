var app = angular.module('vocabTrainerApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      controller: 'MainController',
      templateUrl: '/views/words.html'
    }).
    when('/about', {
      controller: 'AboutController',
      templateUrl: '/views/about.html'
    }).
    when('/trainer', {
      controller: 'TrainerController',
      templateUrl: '/views/trainer.html'
    }).
    when('/words/:word', {
      controller: 'WordController',
      templateUrl: '/views/word.html'
    })
});

app.controller('ShellController', function($scope) {
  $scope.isActiveTab = function(tab) { return tab == $scope.activeTab; };

  $scope.$on('loadedController', function(event, section) {
    console.log('setting active tab to: ' + section);
    $scope.activeTab = section;
  });
});

app.controller('MainController', function($scope, Vocab, $location) {
  $scope.$emit('loadedController', 'words');

  $scope.words = Vocab.words();
  $scope.trashWord = function(word) { Vocab.trashWord(word); }
  $scope.editWord = function(word) { $location.path("/words/" + word.word) }

  $scope.sortProperty = 'word';
  $scope.sortReverse  =  false;

  $scope.sortWords = function(property) {
    console.log('now sorting words - where you go?');
    $scope.sortProperty = property;
    $scope.sortReverse = !$scope.sortReverse;
  }
});

app.controller('TrainerController', function($scope, Vocab) {
  $scope.$emit('loadedController', 'trainer');
  $scope.word = Vocab.nextWord();

  $scope.seeAnswer = function() {
    $scope.displayAnswer = true;
  }

  var proceedToNextWord = function() {
    $scope.word = Vocab.nextWord();
    $scope.displayAnswer = false;
  }

  $scope.soon = function(word) {
    Vocab.markForSoon(word);
    proceedToNextWord();
  }

  $scope.later = function(word) {
    Vocab.markForLater(word);
    proceedToNextWord();
  }
});

app.controller('AboutController', function($scope) {
  $scope.$emit('loadedController', 'about');
});

app.controller('WordController', function($scope, $routeParams, Vocab) {
  var name = $routeParams.word;
  $scope.word = Vocab.wordByName(name);
});
