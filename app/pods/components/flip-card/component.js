import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card','center','aligned'],
  classNameBindings: ['reveal', 'match:has-been-matched'],

  reveal: Ember.computed.alias('card.reveal'),
  match:  Ember.computed.alias('card.match')
});
