'use strict';

angular.module('rocketFactoryAppInternal')
  .factory('Rocket', function (rocketCatalog) {
    function Rocket(name) {
      this.name = name;

      angular.extend(this, rocketCatalog.getByName(name));
    }

    Rocket.prototype.launch = function () {
      if (this.wasLaunched) { return; }
      this.wasLaunched = true;

      if (this.onLaunchCallback) {
        this.onLaunchCallback.apply(null, [this]);
      }
    };

    Rocket.prototype.onLaunch = function (callback) {
      this.onLaunchCallback = callback;
    };

    // Public API here
    return Rocket;
  });
