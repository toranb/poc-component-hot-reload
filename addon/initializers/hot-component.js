import Ember from 'ember';
import HotComponentMixin from 'poc-component-hot-reload/mixins/hot-component-caca';

export function initialize(/* application */) {
  // TODO: move this to the resolver instead so we only do this for classes that are hot-reloadable
  Ember.Component.reopen(HotComponentMixin);
}

export default {
  name: 'hot-component',
  initialize
};
