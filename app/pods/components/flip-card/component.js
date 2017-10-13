import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['card','center','aligned'],
  classNameBindings: ['reveal', 'match:has-been-matched'],

  reveal: alias('card.reveal'),
  match:  alias('card.match')
});
