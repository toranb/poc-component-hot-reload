import Ember from 'ember';
import HotComponentMixin from 'poc-component-hot-reload/mixins/hot-component';

const { getOwner } = Ember;
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

function clearCache (wrapper) {
  const name = wrapper.get('parsedName').fullName;
  const owner = getOwner(wrapper);
  // TODO: we need a public API for this.
  owner.__container__.cache[name + '-original'] = undefined;
  owner.__container__.factoryCache[name + '-original'] = undefined;
  owner.__registry__._resolveCache[name + '-original'] = undefined;
  owner.__registry__._failCache[name + '-original'] = undefined;

  owner.base.__container__.cache[name + '-original'] = undefined;
  owner.base.__container__.factoryCache[name + '-original'] = undefined;
  owner.base.__registry__._resolveCache[name + '-original'] = undefined;
  owner.base.__registry__._failCache[name + '-original'] = undefined;
}

export default Ember.Component.extend(HotComponentMixin, {
  // attrs
  wrappedComponent: null,
  parsedName: null,
  resolver: null, // TODO: consider removing.

  tagName: '',  // tagless component to avoid introducing an extra element

  // TODO: what to do with positional arguments and blocks. I have to reconsider extending or writing
  // my own component helper so it can take a class instead of only a string that will avoid name clashes with
  // template files
  layout: Ember.computed(function () {
    var attributesMap = Object.keys(this.attrs).map(key=>`${key}=${key}`);
    return Ember.HTMLBars.compile(`
      {{#if hasBlock}}
        {{#if (hasBlock "inverse")}}
          {{#component wrappedComponent ${attributesMap} as |a b c d e f g h i j k|}}
            {{yield a b c d e f g h i j k}}
          {{else}}
            {{yield to="inverse"}}
          {{/component}}
        {{else}}
          {{#component wrappedComponent ${attributesMap} as |a b c d e f g h i j k|}}
            {{yield a b c d e f g h i j k}}
          {{/component}}
        {{/if}}
      {{else}}
        {{component wrappedComponent ${attributesMap}}}
      {{/if}}
    `);
  }).volatile(),

  __rerenderOnTemplateUpdate (moduleName) {
    this._super(...arguments);
    var componentPath = getComponentPath(this.constructor);
    if (moduleName === componentPath) {
      clearCache(this);
      this.set('wrappedComponent', undefined);
      this.rerender();
      Ember.run.later(()=> {
        this.set('wrappedComponent', this.get('parsedName').name + '-original');
      });
    }
  }
});
