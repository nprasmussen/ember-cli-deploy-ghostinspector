/* eslint-env node */
'use strict';

var DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-ghostinspector',

  createDeployPlugin: function(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      requiredConfig: ['apiKey'],

      didBuild: function(context) {
        //do something amazing here once the project has been built
      },

      upload: function(context) {
        //do something here to actually deploy your app somewhere
      },

      didUpload: function(context) {
        console.log(context);
        return GhostInspector.executeSuite('5975ba0dafa86562a175cb53', ENV.ghostinspector, function(err, results, passing) {
          if (err) {
            return console.log(`Error: ${err}`);
          }
          console.log(passing === true ? 'Passed' : 'Failed');
          console.log(results);
        });
      },

      didDeploy: function(context) {
        //do something here like notify your team on slack
      }
    });

    return new DeployPlugin();
  }
};
