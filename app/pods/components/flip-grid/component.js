import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui','four','stackable','cards'],
  disabled: false,

  selectedCards: Ember.computed.filterBy('cards', 'reveal', true),
});
