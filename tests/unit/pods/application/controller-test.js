import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('controller initializes with expected properties ', function(assert) {
  let controller = this.subject(),
      images = controller.get('images'),
      initialScore = 0,
      initialAttempts = 0,
      numImages = 6;

  assert.equal(images.length, numImages, `Controller initializes with ${numImages} images`);
  assert.equal(controller.get('score'), initialScore, `Controller initializes with "score" at ${initialScore}`);
  assert.equal(controller.get('score'), initialAttempts, `Controller initializes with "attempts" at ${initialAttempts}`);
});
