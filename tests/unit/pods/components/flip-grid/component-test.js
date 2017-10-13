import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('flip-grid', 'Unit | Component | flip grid', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('checkMatch function properly identifies matching cards', function(assert) {
  // Creates the component instance
  let component = this.subject();

  let emberImage = 'https://upload.wikimedia.org/wikipedia/en/6/69/Ember.js_Logo_and_Mascot.png',
        reactImage = 'https://cdn-images-1.medium.com/max/1600/1*g6s1lvpfArJGorALkKNhvw.png',
        card1 = Ember.Object.create({ index: 0, image: emberImage, reveal: false, matched: false }),
        card2 = Ember.Object.create({ index: 1, image: reactImage, reveal: false, matched: false }),
        card3 = Ember.Object.create({ index: 2, image: emberImage, reveal: false, matched: false });

  assert.ok(component.checkMatch(card1, card3), 'Cards with same image URLs "match"');
  assert.notOk(component.checkMatch(card1, card2), 'Cards with different image URLs do not "match"');
});

test('setHidden function properly hides revealed cards', function(assert) {
  // Creates the component instance
  let component = this.subject();

  let emberImage = 'https://upload.wikimedia.org/wikipedia/en/6/69/Ember.js_Logo_and_Mascot.png',
      card1 = Ember.Object.create({ index: 0, image: emberImage, reveal: true, matched: false }),
      card2 = Ember.Object.create({ index: 1, image: emberImage, reveal: true, matched: false });

  component.setHidden(card1, card2);


  assert.equal(!card1.get('reveal') && !card2.get('reveal'), true, 'Selected cards have reveal value set to false');
});

test('setMatched function properly sets matched value on cards', function(assert) {
  // Creates the component instance
  let component = this.subject();

  let emberImage = 'https://upload.wikimedia.org/wikipedia/en/6/69/Ember.js_Logo_and_Mascot.png',
      card1 = Ember.Object.create({ index: 0, image: emberImage, reveal: true, matched: false }),
      card2 = Ember.Object.create({ index: 1, image: emberImage, reveal: true, matched: false });

  component.setMatched(card1, card2);

  assert.equal(card1.get('match') && card2.get('match'), true, 'Selected cards have match value set to true');
});
