import Ember from 'ember';
import HotComponentMixin from 'poc-component-hot-reload/mixins/hot-component';
export function initialize(/* application */) {
  // NOTE: we need to find a better way to extend the component without reopening
  Ember.Component.reopen(HotComponentMixin);
}

export default {
  name: 'hot-component',
  initialize
};
