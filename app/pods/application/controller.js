import Ember from 'ember';

export default Ember.Controller.extend({
  images: [
    'https://cdn-images-1.medium.com/max/1600/1*g6s1lvpfArJGorALkKNhvw.png',
    'https://upload.wikimedia.org/wikipedia/en/6/69/Ember.js_Logo_and_Mascot.png',
    'https://angular.io/assets/images/logos/angular/angular.png',
    'https://vuejs.org/images/logo.png',
    'https://www.polymer-project.org/images/logos/p-author-logo.png',
    'https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/102012/backbone.png?itok=R-cQvi5L'
  ],

  randomizedCards: Ember.computed('images.length', function() {
    let images = this.get('images'),
        duplicatedImages = images.concat(images);

    return duplicatedImages.sort(() => { return 0.5 - Math.random() });
  })
});
