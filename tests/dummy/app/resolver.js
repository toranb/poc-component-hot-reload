import EmberResolver from 'ember-resolver';
import HotReloadMixin from 'poc-component-hot-reload/mixins/hot-reload-resolver';

const Resolver = EmberResolver.extend(HotReloadMixin);
export default Resolver;
