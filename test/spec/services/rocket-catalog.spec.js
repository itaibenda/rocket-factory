'use strict';

describe('Service: rocketCatalog', function () {

  // load the service's module
  beforeEach(function () {
    module('rocketFactoryAppInternal');
  });

  function createDummyMissile(options) {
    return angular.extend({
      name: 'rocket name',
      caliber: 30,
      length: 180,
      weight: 50,
      warHeadWeight: 8,
      maxRange: 7,
      manufacturer: 'hamas'
    }, options);
  }

  function rocketWithId(rocket, id) {
    return angular.extend({}, rocket, { id: id });
  }

  // instantiate service
  var rocketCatalog;
  beforeEach(inject(function (_rocketCatalog_) {
    rocketCatalog = _rocketCatalog_;
  }));

  it('should allow to list the catalog', function () {
    expect(rocketCatalog.list()).toEqual(jasmine.any(Array));
  });

  it('should allow to add a missile to the catalog', function () {
    var dummyMissile = createDummyMissile();

    rocketCatalog.add(dummyMissile);
    expect(rocketCatalog.list()).toContain(
      rocketWithId(dummyMissile, jasmine.any(Number))
    );
  });

  it('should allow to clear the catalog', function () {
    rocketCatalog.add(createDummyMissile());
    rocketCatalog.clear();
    expect(rocketCatalog.list()).toEqual([]);
  });

  it('should add each missile with a running id', function () {
    var dummyMissile1 = createDummyMissile();
    var dummyMissile2 = createDummyMissile();

    rocketCatalog.clear();
    rocketCatalog.add(dummyMissile1);
    rocketCatalog.add(dummyMissile2);

    expect(rocketCatalog.list()).toEqual([
      rocketWithId(dummyMissile1, 0),
      rocketWithId(dummyMissile2, 1)
    ]);
  });

  it('should get a null rocket by name from the catalog', function () {
    expect(rocketCatalog.getByName('qassam')).toBeUndefined();
  });

  it('should get a rocket by name', function () {
    var rocketName = 'qassam';
    var qassam = createDummyMissile({ name: rocketName });

    rocketCatalog.add(qassam);
    expect(rocketCatalog.getByName(rocketName)).toEqual(rocketWithId(qassam, jasmine.any(Number)));
  });

  it('should populate the catalog with some rockets during construction', function () {
    expect(rocketCatalog.getByName('Qassam2 Short')).toBeDefined();
    expect(rocketCatalog.getByName('Qassam2 Long')).toBeDefined();
    expect(rocketCatalog.getByName('Al Quds 2B')).toBeDefined();
    expect(rocketCatalog.getByName('Al Quds 3B')).toBeDefined();
    expect(rocketCatalog.getByName('Nazzer 3 Long')).toBeDefined();
    expect(rocketCatalog.getByName('Nazzer 4')).toBeDefined();
  });
});
