var app = angular.module('vocabTrainerApp');

app.factory('Vocab', function() {

  var words = [
    {
      word: 'Bacchanalia',
      definition: 'Drunken celebrations',
      type: 'noun'
    },
    {
      word: 'Nebulous',
      definition: '(of a concept) vague of ill-defined',
      type: 'adjective'
    },
    {
      word: 'Parsimonious',
      definition: 'Very unwilling to spend money or use resources',
      type: 'Adjective'
    },
    {
      word: 'Voracious',
      definition: 'Having a very eager approach to an activity',
      type: 'Adjective'
    },
    {
      word: 'Verdant',
      definition: 'Green with grass or other rich vegetation',
      type: 'Adjective'
    }
  ];

  var Vocab = {
    init: function() {
      this.currentWord = _.first(this.words());
    },
    currentWord: null,
    words: function() {
      return this._words || this.getWords();
    },
    getWords: function() {
      this._words = words;
      return this._words;
    },
    trashWord: function(word) {
      this._words.splice(_.indexOf(this._words, word), 1);
    },
    // grab the next word in the list or wrap around to the start
    nextWord: function() {
      if(_.last(this.words()).word == this.currentWord.word) {
        this.currentWord = _.first(this.words());
      } else {
        var currentIndex = _.indexOf(this.words(), this.currentWord);
        this.currentWord = this.words()[currentIndex + 1];
      }

      return this.currentWord;
    },
    wordByName: function(name) {
      return _.detect(this.words(), function(word) {
        return word.word == name;
      });
    },
    // simply move word to end of the list
    markForLater: function(word) {
      var words = this.words();
      words.splice(_.indexOf(words, word), 1);
      words.push(word);
    },
    // place the word in the middle of the list
    markForSoon: function(word) {
      var words = this.words();
      words.splice(_.indexOf(words, word), 1);
      words.splice(parseInt(words.length/2), 0, word);
    }
  }

  Vocab.init();

  return Vocab;
});
