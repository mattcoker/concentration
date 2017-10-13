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

test('controller initializes with expected properties', function(assert) {
  let controller = this.subject(),
      images = controller.get('images'),
      initialScore = 0,
      initialAttempts = 0,
      numImages = 6;

  assert.equal(images.length, numImages, `Controller initializes with ${numImages} images`);
  assert.equal(controller.get('score'), initialScore, `Controller initializes with "score" at ${initialScore}`);
  assert.equal(controller.get('score'), initialAttempts, `Controller initializes with "attempts" at ${initialAttempts}`);
});

test('randomizedCards is not just a duplicated images array', function(assert) {
  let controller = this.subject(),
    { images, randomizedCards} = controller.getProperties('images', 'randomizedCards');

  // Duplicate images on itself to "verify" that randomizedCards is random
  images = images.concat(images);

  assert.notDeepEqual(images, randomizedCards, `randomizedCards computed property is actually random`);
});

test('cardsWithMetadata contains the necessary data struture', function(assert) {
  let controller = this.subject(),
      cardsWithMetadata = controller.get('cardsWithMetadata'),
      haveIndexes = true,
      haveImages = true,
      revealIsFalse = true,
      matchIsFalse = true;

  cardsWithMetadata.forEach((card) => {
    let props = Object.keys(card);
    if (!props.includes('index')) haveIndexes = false;
    if (!props.includes('image')) haveImages = false;
    if (card.get('reveal')) revealIsFalse = false;
    if (card.get('match')) matchIsFalse = false;
  })

  assert.equal(haveIndexes, true, `All cards have an "index" property`);
  assert.equal(haveImages, true, `All cards have an "images" property`);
  assert.equal(revealIsFalse, true, `All cards have a "reveal" property set to false`);
  assert.equal(matchIsFalse, true, `All cards have a "match" property set to false`);
});

test('numCards matches the length of cardsWithMetadata', function(assert) {
  let controller = this.subject();

  assert.equal(controller.get('cardsWithMetadata.length'), controller.get('numCards'), 'numCards property matches total length of cardsWithMetadata');
});

test('gameOver computed property is triggered when all cards have been matched', function(assert) {
  let controller = this.subject(),
      cardsWithMetadata = controller.get('cardsWithMetadata');

  assert.equal(controller.get('gameOver'), false, 'gameOver intitializes as false');

  cardsWithMetadata.set('firstObject.match', true);
  cardsWithMetadata.set('lastObject.match', true);
  assert.equal(controller.get('gameOver'), false, 'gameOver remains false when some (but not all) cards are matched');

  cardsWithMetadata = cardsWithMetadata.map((card) => {
    card.set('match', true);
    return card;
  });

  assert.equal(controller.get('gameOver'), true, 'gameOver is true when all cards are matched');
});

test('statusMessage reflects the current state of the game', function(assert) {
  let controller = this.subject(),
      cardsWithMetadata = controller.get('cardsWithMetadata');

  assert.equal(controller.get('statusMessage'), 'Score: 0, Attempts: 0', 'statusMessage initializes by displaying score and number of attempts');

  cardsWithMetadata = cardsWithMetadata.map((card) => {
    card.set('match', true);
    return card;
  });

  assert.equal(controller.get('statusMessage'), 'Game Over! You finished with a score of 0 out of a possible 6', 'statusMessage displays final score when all cards are matched');
});

test('updateScore modifies game state', function(assert) {
  let controller = this.subject();

  assert.equal(controller.get('score'), 0, '"score" property inintializes at 0');
  assert.equal(controller.get('attempts'), 0, '"attempts" property inintializes at 0');

  let expectedScore = 5;
  controller.send('updateScore', expectedScore);

  assert.equal(controller.get('score'), expectedScore, `"score" property is increased to ${expectedScore}`);
  assert.equal(controller.get('attempts'), 1, '"attempts" property is increased to 1');
});
