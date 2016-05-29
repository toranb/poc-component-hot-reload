import Ember from 'ember';
// import layout from 'dummy/templates/components/my-component';

export default Ember.Component.extend({
  // layout,
  init () {
    // Adding this for debugging purposes.
    window.myComponent = this;
    this._super(...arguments);
  },
  message: 'This is a message from the original component JS',
  internalCounter: 1,
  actions: {
    myAction () {
      window.alert('Hi from original component');
    },
    incrementeExternalCounter () {
      this.incrementProperty('externalCounter');
    },
    incrementeInternalCounter () {
      this.incrementProperty('internalCounter');
    }
  }
});
