import Ember from 'ember';
// import layout from 'dummy/templates/components/my-component';

const MyComponent = Ember.Component.extend({
  // layout,
  init () {
    // Adding this for debugging purposes.
    window.myComponent = this;
    this._super(...arguments);
  },
  positionalParam1: null,
  positionalParam2: null,
  message: 'This is a message from the original component JS',
  internalCounter: 16,
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

MyComponent.reopenClass({
  positionalParams: ['positionalParam1', 'positionalParam2']
});
export default MyComponent;
