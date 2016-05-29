# TODOS

- [x] Make it easier to test "simulated" hot reload from the UI
- [ ] Make this work with Ember stable (2.5 today). Setting the template doesn't refresh. Seems like we need to set it on component.block.template (not sure about layout)
- [ ] Remove old templates from the container and ask the resolver again for the new one instead or relying on the module path
- [ ] Test to make sure this works for layouts as well as templates. 
- [ ] Add hot-reload for component classes
- [ ] Add tests 
- [ ] Integrate with toran's work for the server/build side
- [ ] End to end tests
- [ ] Move out of POC
