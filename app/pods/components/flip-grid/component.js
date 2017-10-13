import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['ui','four','stackable','cards'],

  selectedCards: computed(function() {
    // Create new array for each instance of the grid component
    return [];
  }),

  checkMatch(firstCard, secondCard) {
    return firstCard.get('image') === secondCard.get('image');
  },

  setHidden(firstCard, secondCard) {
    firstCard.set('reveal', false);
    secondCard.set('reveal', false);
  },

  setMatched(firstCard, secondCard) {
    firstCard.set('match', true);
    secondCard.set('match', true);
  },

  actions: {
    selectCard: function(selectedCard) {
      const selectedCards = this.get('selectedCards'),
            firstSelected = selectedCards.get('firstObject');

      if (selectedCards.length > 2) {
        return;
      }

      selectedCard.set('reveal', true);
      selectedCards.pushObject(selectedCard);

      if( selectedCards.length < 2 ) {
        // No need to check for matches if we don't have 2 items selected
        return;
      }

      later(() => {
        let scoreDelta = -.25;
        // Pair has been selected, set reveal to false for all selected cards
        this.setHidden(firstSelected, selectedCard);

        if (this.checkMatch(firstSelected, selectedCard)) {
          this.setMatched(firstSelected, selectedCard);
          scoreDelta = 1;
        }

        this.trigger('updateScore', scoreDelta);
        selectedCards.clear();
      }, 500);
    }
  }
});
