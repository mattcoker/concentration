import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card','center','aligned'],
  classNameBindings: ['reveal', 'match:has-been-matched'],

  reveal: Ember.computed.alias('card.reveal'),
  match: Ember.computed.alias('card.match'),

  click() {
    // Only allow for "card flipping" if activity is not disabled and isn't
    // already revealed
    if (!this.get('disabled') && !this.get('reveal')) {
      this.set('reveal', true);
    }
  }
});
