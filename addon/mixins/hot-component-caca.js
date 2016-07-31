/* globals require */

import Ember from 'ember';
import HotComponentMixin from 'poc-component-hot-reload/mixins/hot-component';

// The component's constructor is in the format namespace@component:component-name:
// We can about the namespace and component-name
const nameExpression = /(.*)@.*:(.*):/;
function getTemplatePath (constructor) {
  let constructorString = constructor.toString();
  let [, namespace, componentName] = constructorString.match(nameExpression) || [];
  if (namespace && componentName) {
    // Quick hack for now, we need to instead remove it from the container and then use the resolver *again*
    // so it actually works with PODs or custom resolvers.
    return `${namespace}/templates/components/${componentName}`;
  }
}

export default Ember.Mixin.create(HotComponentMixin, {
  __rerenderOnTemplateUpdate (moduleName) {
    this._super(...arguments);
    const templatePath = getTemplatePath(this.constructor);
    if (moduleName === templatePath) {
      this.set('layout', require(templatePath).default);
      this.rerender();
    }
  }
});
