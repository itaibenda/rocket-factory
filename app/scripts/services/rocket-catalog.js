'use strict';

angular.module('rocketFactoryAppInternal')
  .service('rocketCatalog', function rocketCatalog() {
    var rockets = [], missileId = 0;

    this.list = function () {
      return rockets;
    };

    this.clear = function () {
      rockets = [];
      missileId = 0;
    };

    this.add = function (newRocket) {
      rockets.push(angular.extend({}, newRocket, { id: missileId++ }));
    };

    this.getByName = function (rocketName) {
      return rockets.filter(function (rocket) {
        return rocket.name === rocketName;
      })[0];
    };

    [
      {name: 'Qassam2 Short', caliber: 115, length: 180, weight: 35, warHeadWeight: 8, maxRange: 7, manufacturer: 'Hamas'},
      {name: 'Qassam2 Long', caliber: 115, length: 250, weight: 50, warHeadWeight: 8, maxRange: 10, manufacturer: 'Hamas'},
      {name: 'Al Quds 2B', caliber: 115, length: 110, weight: 33.5, warHeadWeight: 8, maxRange: 7, manufacturer: 'Islamic Jihad'},
      {name: 'Al Quds 3B', caliber: 127.5, length: 200, weight: 42, warHeadWeight: 8, maxRange: 9, manufacturer: 'Islamic Jihad'},
      {name: 'Nazzer 3 Long', caliber: 90, length: 160, weight: 30, warHeadWeight: 10, maxRange: 9, manufacturer: 'Popular Resistance Committees'},
      {name: 'Nazzer 4', caliber: 115, length: 180, weight: 40, warHeadWeight: 10, maxRange: 9, manufacturer: 'Popular Resistance Committees'}
    ].map(this.add);
  });
