/* globals require */

import Ember from 'ember';
const {inject} = Ember;

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

  __rerenderOnTemplateUpdate (moduleName) {
    const templatePath = getTemplatePath(this.constructor);
    if (moduleName === templatePath) {
      this.set('layout', require(templatePath).default);
      this.rerender();
    }
  }
});
