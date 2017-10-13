
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('image-asset', 'helper:image-asset', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  let filename = 'ember.png',
      path = '/assets/images/';

  this.set('filename', filename);

  this.render(hbs`{{image-asset filename}}`);
  assert.equal(this.$().text().trim(), path + filename);
});

