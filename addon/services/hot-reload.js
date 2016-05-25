import Ember from 'ember';
const {Evented} = Ember;

export default Ember.Service.extend(Evented, {
  init () {
    // Adding this for debugging purposes.
    window.hotReloadService = this;
    this._super(...arguments);
  }
});
