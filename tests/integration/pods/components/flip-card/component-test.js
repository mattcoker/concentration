import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flip-card', 'Integration | Component | flip card', {
  integration: true,

  beforeEach: function() {
    let imagePath = 'https://upload.wikimedia.org/wikipedia/en/6/69/Ember.js_Logo_and_Mascot.png';
    this.setProperties({
      card: Ember.Object.create({ index: 0, image: imagePath, reveal: false, matched: false }),
      disabled: false
    });

    this.render(hbs`{{flip-card card=card disabled=disabled}}`);
  }
});

test('it renders', function(assert) {
  // Expect no internal text, as we only deal with images
  assert.equal(this.$().text().trim(), '', 'Component contains no text');

  assert.ok(this.$('div').hasClass('card'), `Class name 'card' detected on the root component element`);
});

test('class name bindings are functional', function(assert) {
  let classBindings = {
    'reveal': 'reveal',
    'match': 'has-been-matched'
  }

  // Test classBindings pairs to verify the property state matches the expected
  // class
  for (let prop in classBindings) {
    assert.notOk(this.$('div').hasClass(classBindings[prop]), `Class name binding for '${prop}' should not yet be in effect`);
    this.set('card.' + prop, true);
    assert.ok(this.$('div').hasClass(classBindings[prop]), `Class name binding for '${prop}' added the class of '${classBindings[prop]}'`);
  }
});

test('click events modify card state in expected manner', function(assert) {

  // Confirm setting disabled flag to true prevents click event from modifying
  // state
  this.set('disabled', true);
  this.$('div').click();
  assert.notOk(this.$('div').hasClass('reveal'), `'reveal' class prevented from being added to component element`);

  // Confirm setting disabled flag to true prevents click event from modifying
  // state
  this.set('disabled', false);
  this.$('div').click();
  assert.ok(this.$('div').hasClass('reveal'), `'reveal' class allowed to be added to component element`);
});
