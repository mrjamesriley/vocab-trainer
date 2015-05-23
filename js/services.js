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
    nextWord: function() {
      return _.sample(this.words());
    },
    wordByName: function(name) {
      return _.detect(this.words(), function(word) {
        return word.word == name;
      });
    }
  }

  return Vocab;
});
