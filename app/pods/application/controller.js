import Ember from 'ember';

export default Ember.Controller.extend({
  images: [
    '/assets/images/react.png',
    '/assets/images/ember.png',
    '/assets/images/angular.png',
    '/assets/images/vue.png',
    '/assets/images/polymer.png',
    '/assets/images/backbone.png'
  ],
  score: 0,
  attempts: 0,

  randomizedCards: Ember.computed(function() {
    let images = this.get('images'),
        duplicatedImages = images.concat(images);

    return duplicatedImages.sort(() => { return 0.5 - Math.random() });
  }),

  cardsWithMetadata: Ember.computed('randomizedCards.[]', function() {
    return this.get('randomizedCards').map((image, index) => {
      return Ember.Object.create({
        index: index,
        image: image,
        reveal: false,
        match: false
      });
    })
  }),

  numCards: Ember.computed.reads('cardsWithMetadata.length'),

  gameOver: Ember.computed('cardsWithMetadata.@each.match', function() {
    let numCards        = this.get('numCards'),
        numMatchedCards = this.get('cardsWithMetadata').filterBy('match', true).get('length');

    return numMatchedCards === numCards;
  }),

  statusMessage: Ember.computed('gameOver', 'score', 'attempts', function() {
    let { gameOver, score, attempts, numCards} = this.getProperties('gameOver', 'score', 'attempts', 'numCards'),
        maxScore = numCards / 2;
    if (gameOver) return `Game Over! You finished with a score of ${score} out of a possible ${maxScore}`;
    return `Score: ${score}, Attempts: ${attempts}`;
  }),

  actions: {
    updateScore(delta) {
      let currScore = this.get('score');
      this.set('score', currScore + delta);
      this.incrementProperty('attempts');
    },

    reset() {
      window.location.reload(true);
    }
  }
});
