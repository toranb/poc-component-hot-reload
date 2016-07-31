import Ember from 'ember';

const {inject} = Ember;

export default Ember.Controller.extend({
  hotReload: inject.service(),
  ajax: Ember.inject.service(),
  now: new Date(),
  externalCounter: 10,
  actions: {
    updateTemplate() {
      // This simulates a change to the template and a rebuild.
      // Once we have everything hooked together, when ember-cli rebuilds
      // we will trigger an event, handled by the hotReload, which will attemp
      // to download the module and if it finds it, eval it then trigger an event
      // we do this two steps manually to simulate that part.
      this.get('ajax').request('updated-template.js', {method: 'GET', dataType: 'text'}).then(template=>{
        eval(template);
        this.get('hotReload').trigger('newChanges', 'dummy/templates/components/my-component');
      });
    },
    updateComponent () {
      // This simulates a change to the template and a rebuild.
      // Once we have everything hooked together, when ember-cli rebuilds
      // we will trigger an event, handled by the hotReload, which will attemp
      // to download the module and if it finds it, eval it then trigger an event
      // we do this two steps manually to simulate that part.
      this.get('ajax').request('updated-component.js', {method: 'GET', dataType: 'text'}).then(componentCode=>{
        eval(componentCode);
        this.get('hotReload').trigger('newChanges', 'dummy/components/my-component');
      });
    },

    controllerAction () {
      window.alert('Action handled by the controller');
    }
  }
});
