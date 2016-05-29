import Ember from 'ember';
import HotComponentMixin from 'poc-component-hot-reload/mixins/hot-component';
import layout from 'poc-component-hot-reload/templates/components/hot-replacement-component';

// The component's constructor is in the format namespace@component:component-name:
// We can about the namespace and component-name
const nameExpression = /(.*)@.*:(.*):/;
function getComponentPath (constructor) {
  // TODO: consider using resolver.lookupDescription(parsedName.fullName) instead of all this crap
  let constructorString = constructor.toString();
  let [, namespace, componentName] = constructorString.match(nameExpression) || [];
  if (namespace && componentName) {
    // Quick hack for now, we need to instead remove it from the container and then use the resolver *again*
    // so it actually works with PODs or custom resolvers.
    return `${namespace}/components/${componentName}`;
  }
}

export default Ember.Component.extend(HotComponentMixin, {
  // attrs
  wrappedComponent: null,

  tagName: '',  // tagless component to avoid introducing an extra element
  layout, // We need to avoid getting it from the resolver

  __rerenderOnTemplateUpdate (moduleName) {
    this._super(...arguments);
    var componentPath = getComponentPath(this.constructor);
    if (moduleName === componentPath) {
      var newComponent = this.get('resolver').resolveOther(this.get('parsedName'));
      this.set('wrappedComponent', newComponent);
    }
  }
});
