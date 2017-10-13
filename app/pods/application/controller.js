import Ember from 'ember';

export default Ember.Controller.extend({
  images: [
    '/assets/images/react.png',
    '/assets/images/ember.png',
    '/assets/images/angular.png',
    '/assets/images/vue.png',
    '/assets/images/polymer.png',
    '/assets/images/backbone.png'
  ],

  randomizedCards: Ember.computed('images.length', function() {
    let images = this.get('images'),
        duplicatedImages = images.concat(images);

    return duplicatedImages.sort(() => { return 0.5 - Math.random() });
  })
});
