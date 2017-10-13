import Ember from 'ember';

export function imageAsset(params) {
  return `/assets/images/${params[0]}`;
}

export default Ember.Helper.helper(imageAsset);
