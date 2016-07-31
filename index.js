/* jshint node: true */
'use strict';

module.exports = {
  name: 'poc-component-hot-reload',
  included (app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/ember/ember-template-compiler.js');
  }
};
