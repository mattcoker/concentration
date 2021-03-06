import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const emberImage = 'ember.png',
      reactImage = 'react.png';

moduleForComponent('flip-grid', 'Integration | Component | flip grid', {
  integration: true,

  beforeEach: function() {
    let card1 = EmberObject.create({ index: 0, image: emberImage, reveal: false, matched: false }),
        card2 = EmberObject.create({ index: 1, image: reactImage, reveal: false, matched: false }),
        card3 = EmberObject.create({ index: 2, image: emberImage, reveal: false, matched: false });

    this.setProperties({
      cards: [card1, card2, card3],
      disabled: false
    });

    this.render(hbs`{{flip-grid cards=cards}}`);
  }
});

test('it renders', function(assert) {
  assert.equal(this.$().text().trim(), '', 'Component contains no text');

  let classNames = this.$('div').attr('class').split(' ');
  assert.deepEqual(['ui','four','stackable','cards', 'ember-view'], classNames, 'Component includes classes for necessary layout rendering');
});
