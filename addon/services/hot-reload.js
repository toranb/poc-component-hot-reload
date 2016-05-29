import Ember from 'ember';
const {Evented} = Ember;

export default Ember.Service.extend(Evented, {
  init () {
    // Adding this for debugging purposes.
    window.hotReloadService = this;
    this._super(...arguments);
  }

  // TODO: change signature to use accept instead of a 'newChanges' event https://webpack.github.io/docs/hot-module-replacement.html
});
