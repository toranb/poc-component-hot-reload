define('dummy/components/my-component', ['exports', 'ember'], function (exports, _ember) {
  // import layout from 'dummy/templates/components/my-component';

  exports['default'] = _ember['default'].Component.extend({
    // layout,
    init: function init() {
      // Adding this for debugging purposes.
      window.myComponent = this;
      this._super.apply(this, arguments);
    },
    message: 'This is a message from the updated component JS',
    internalCounter: 42,
    actions: {
      myAction: function myAction() {
        window.alert('Hi from updated component');
      },
      incrementeExternalCounter: function incrementeExternalCounter() {
        this.incrementProperty('externalCounter');
      },
      incrementeInternalCounter: function incrementeInternalCounter() {
        this.incrementProperty('internalCounter');
      }
    }
  });
});
