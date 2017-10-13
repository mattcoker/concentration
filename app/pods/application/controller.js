import { reads } from '@ember/object/computed';
import EmberObject, { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  images: ['react.png','ember.png','angular.png','vue.png','polymer.png','backbone.png'],
  score: 0,
  attempts: 0,

  randomizedCards: computed(function() {
    let images = this.get('images'),
        duplicatedImages = images.concat(images);

    return duplicatedImages.sort(() => { return 0.5 - Math.random() });
  }),

  cardsWithMetadata: computed('randomizedCards.[]', function() {
    return this.get('randomizedCards').map((image, index) => {
      return EmberObject.create({
        index: index,
        image: image,
        reveal: false,
        match: false
      });
    });
  }),

  numCards: reads('cardsWithMetadata.length'),

  gameOver: computed('cardsWithMetadata.@each.match', function() {
    let numCards        = this.get('numCards'),
        numMatchedCards = this.get('cardsWithMetadata').filterBy('match', true).get('length');

    return numMatchedCards === numCards;
  }),

  statusMessage: computed('gameOver', 'score', 'attempts', function() {
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
