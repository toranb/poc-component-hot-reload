import Ember from 'ember';
const {inject} = Ember;

export default Ember.Mixin.create({
  hotReload: inject.service(),

  init () {
    this._super(...arguments);
    this.get('hotReload').on('newChanges', this, '__rerenderOnTemplateUpdate');
  },
  willDestroyElement () {
    this._super(...arguments);
    this.get('hotReload').off('newChanges', this, '__rerenderOnTemplateUpdate');
  },

  __rerenderOnTemplateUpdate (/*moduleName*/) {
    // abstract, to be overridden by mixee
  }
});
