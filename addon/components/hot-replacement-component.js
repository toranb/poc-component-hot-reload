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
  const name = `component:${wrapper.get('wrappedComponentName')}`;
  const owner = getOwner(wrapper);
  // TODO: we need a public API for this.
  owner.__container__.cache[name] = undefined;
  owner.__container__.factoryCache[name] = undefined;
  owner.__registry__._resolveCache[name] = undefined;
  owner.__registry__._failCache[name] = undefined;

  owner.base.__container__.cache[name] = undefined;
  owner.base.__container__.factoryCache[name] = undefined;
  owner.base.__registry__._resolveCache[name] = undefined;
  owner.base.__registry__._failCache[name] = undefined;
}

const HotReplacementComponent = Ember.Component.extend(HotComponentMixin, {
  // attrs
  parsedName: null,

  tagName: '',  // tagless component to avoid introducing an extra element

  // TODO: what to do with positional arguments and blocks. I have to reconsider extending or writing
  // my own component helper so it can take a class instead of only a string that will avoid name clashes with
  // template files
  layout: Ember.computed(function () {
    // TODO: consider excluding positional params from the attributesMap
    // and pass them as positionalParams instead. Not sure there is a difference
    const positionalParams = this.constructor.positionalParams;
    const attributesMap = Object.keys(this.attrs)
      .filter(key => positionalParams.indexOf(key) === -1)
      .map(key =>`${key}=${key}`).join(' ');
    return Ember.HTMLBars.compile(`
      {{#if hasBlock}}
        {{#if (hasBlock "inverse")}}
          {{#component wrappedComponentName ${positionalParams.join(' ')} ${attributesMap} as |a b c d e f g h i j k|}}
            {{yield a b c d e f g h i j k}}
          {{else}}
            {{yield to="inverse"}}
          {{/component}}
        {{else}}
          {{#component wrappedComponentName ${positionalParams.join(' ')} ${attributesMap} as |a b c d e f g h i j k|}}
            {{yield a b c d e f g h i j k}}
          {{/component}}
        {{/if}}
      {{else}}
        {{component wrappedComponentName ${positionalParams.join(' ')} ${attributesMap}}}
      {{/if}}
    `);
  }).volatile(),

  __rerenderOnTemplateUpdate (moduleName) {
    this._super(...arguments);
    var componentPath = getComponentPath(this.constructor);
    if (moduleName === componentPath) {
      clearCache(this);
      const wrappedComponentName = this.get('wrappedComponentName');
      this.set('wrappedComponentName', undefined);
      this.rerender();
      Ember.run.later(()=> {
        this.set('wrappedComponentName', wrappedComponentName);
      });
    }
  }
});

HotReplacementComponent.reopenClass({
  /***
   * Returns a new class with the correct positional params and settings configured correctly
   */
  createClass(OriginalComponentClass, parsedName) {
    const NewComponentClass = HotReplacementComponent.extend({
      wrappedComponentName: parsedName.fullNameWithoutType + '-original'
    });
    NewComponentClass.reopenClass({
      positionalParams: OriginalComponentClass.positionalParams ? OriginalComponentClass.positionalParams.slice() : []
    });
    return NewComponentClass;
  }
});
export default HotReplacementComponent;
