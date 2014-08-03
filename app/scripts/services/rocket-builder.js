'use strict';

(function () {
  var module = angular.module('rocketFactoryAppInternal');

  module.provider('rocketBuilder', function () {
    var options = {
      buildTimeMS: 5000,
      onStartCallback: angular.noop,
      onStopCallback: angular.noop,
      onNewRocketCallback: angular.noop
    };

    this.setBuildTime = function (buildTimeMS) {
      options.buildTimeMS = buildTimeMS;
    };

    this.$get = function ($interval, Rocket) {
      var RocketBuilder = function (options) {
        this.options = options;
      };

      RocketBuilder.prototype.getOptions = function () {
        return this.options;
      };

      RocketBuilder.prototype.onStart = function (callback) {
        this.options.onStartCallback = callback;
      };

      RocketBuilder.prototype.onStop = function (callback) {
        this.options.onStopCallback = callback;
      };

      RocketBuilder.prototype.onNewRocket = function (callback) {
        this.options.onNewRocketCallback = callback;
      };

      RocketBuilder.prototype.start = function () {
        try {
          this.options.onStartCallback.apply(null, [this]);
        } catch (e) {}

        var _self = this;
        this.createInterval = $interval(function () {
          try {
            var myRocket = new Rocket();
            _self.options.onNewRocketCallback.apply(null, [myRocket, _self]);
          } catch (e) {}
        }, this.options.buildTimeMS);
      };

      RocketBuilder.prototype.stop = function () {
        try {
          this.options.onStopCallback.apply(null, [this]);
        } catch (e) {}

        if (this.createInterval) {
          $interval.cancel(this.createInterval);
        }
      };

      return {
        create: function () {
          return new RocketBuilder(options);
        }
      };
    };
  });
}());

