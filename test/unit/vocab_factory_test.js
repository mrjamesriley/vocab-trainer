describe('Vocab Factory', function() {

  beforeEach(module('vocabTrainerApp'));

  var Vocab;

  beforeEach(inject(function($injector) {
    Vocab = $injector.get('Vocab');
    Vocab._words = [
      { word: 'Banana' },
      { word: 'Apple' },
      { word: 'Plum' },
      { word: 'Grape', definition: 'A berry growing in clusters on a grapevine' },
      { word: 'Orange' },
      { word: 'Pear' }
    ];
  }));

  describe('nextWord', function() {
    it('should retrieve the next word in the list', function() {
      Vocab.currentWord = Vocab.wordByName('Plum');
      expect(Vocab.nextWord().word).toEqual('Grape');
    });

    it('should return to the start of the list once the end is reached', function() {
      Vocab.currentWord = Vocab.wordByName('Pear');
      expect(Vocab.nextWord().word).toEqual('Banana');
    });
  });

  describe('markForLater', function() {
    it('should place the word to the back of the word list', function() {
      Vocab.markForLater(Vocab.words()[0]);
      expect(_.last(Vocab.words())).toEqual({ word: 'Banana' });
    });
  });

  describe('markForSoon', function() {
    it('should place the word to the middle of the word list', function() {
      Vocab.markForSoon(Vocab.words()[0]);
      expect(Vocab.words()[2]).toEqual({ word: 'Banana' });
    });
  });

  describe('wordByName', function() {
    it('retrieve the Word object for a given word', function() {
      expect(Vocab.wordByName('Grape').definition).toEqual('A berry growing in clusters on a grapevine');
    });
  });

  describe('trashWord', function() {
    it('remove a Word object from the words list', function() {
      var word = Vocab.wordByName('Apple');
      Vocab.trashWord(word);
      expect(Vocab.wordByName('Apple')).toEqual(undefined);
    });
  });

});
