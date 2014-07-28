// Generated on 2014-07-28 using generator-wix-angular 0.1.60
'use strict';

module.exports = function (grunt) {
  var unitTestFiles = [];
  require('./karma.conf.js')({set: function (karmaConf) {
    unitTestFiles = karmaConf.files.filter(function (value) {
      return value.indexOf('bower_component') !== -1;
    });
  }});
  require('wix-gruntfile')(grunt, {
    staging: 'pizza',
    port: 9000,
    preloadModule: 'rocketFactoryAppInternal',
    translationsModule: 'rocketFactoryTranslations',
    unitTestFiles: unitTestFiles,
    protractor: true
  });
};
