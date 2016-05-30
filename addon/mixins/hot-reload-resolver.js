import Ember from 'ember';
import HotReplacementComponent from 'poc-component-hot-reload/components/hot-replacement-component';

export default Ember.Mixin.create({
  resolveTemplate () {
    console.log('Called resolveTemplate', arguments);
    return this._super(...arguments);
  },
  resolveOther (parsedName) {
    const resolved = this._super(...arguments);

    if (parsedName.type === 'component') {
      console.log('Called resolveOther for component', parsedName);
      if (resolved) {
        // TODO: make sure we only need it for components that may actually change, not for *every* component
        return this._resolveComponent(resolved, parsedName);
      }
      if (parsedName.fullName.match(/\-original$/)) {
        parsedName.fullName = parsedName.fullName.replace(/-original$/, '');
        parsedName.fullNameWithoutType = parsedName.fullNameWithoutType.replace(/-original$/, '');
        parsedName.name= parsedName.name.replace(/-original$/, '');
        return this._super(parsedName);
      }
    }
    return resolved;
  },

  _resolveComponent (resolved, parsedName) {
    return HotReplacementComponent.extend({
      wrappedComponent: parsedName.fullNameWithoutType + '-original',
      parsedName: parsedName,
      resolver: this  // We need to pass this since each app might override the default, so we don't want to just ES import ours
    });
  }
});
