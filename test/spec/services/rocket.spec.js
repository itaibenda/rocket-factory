'use strict';

describe('Service: rocket', function () {

  // load the service's module
  beforeEach(function () {
    module('rocketFactoryAppInternal');
  });

  // instantiate service
  var Rocket, rocketCatalogMock, rocketCatalogItemMock;

  beforeEach(function () {
    rocketCatalogItemMock = {
      name: 'Mock Rocket',
      caliber: 123
    };

    rocketCatalogMock = {
      getByName: jasmine.createSpy('rocketCatalog.getByName').andCallFake(function (name) {
        if (rocketCatalogItemMock.name === name) {
          return rocketCatalogItemMock;
        }
      })
    };

    module({
      rocketCatalog: rocketCatalogMock
    });
  });

  beforeEach(inject(function (_Rocket_) {
    Rocket = _Rocket_;
  }));

  it('should build a rocket', function () {
    expect((new Rocket()).constructor.name.toString()).toBe('Rocket');
  });

  it('should build a rocket by name', function () {
    expect((new Rocket('Rocket Name')).name).toBe('Rocket Name');
  });

  it('should build multiple rockets', function () {
    var rocket1 = new Rocket('Rocket1');
    var rocket2 = new Rocket('Rocket2');
    expect((rocket1).name).toBe('Rocket1');
    expect((rocket2).name).toBe('Rocket2');
  });

  it('should get the rocket spec from the rocket catalog', function () {
    expect((new Rocket('Mock Rocket')).caliber).toBe(123);
    expect(rocketCatalogMock.getByName).toHaveBeenCalledWith('Mock Rocket');
  });

  it('should be able to launch a rocket', function () {
    var rocket = new Rocket();
    rocket.launch();
    expect(rocket.wasLaunched).toBe(true);
  });

  it('should be able to register a callback onLaunch', function () {
    var spy = jasmine.createSpy('spy');
    var rocket = new Rocket();
    rocket.onLaunch(spy);
    rocket.launch();

    expect(spy).toHaveBeenCalledWith(rocket);
  });

  it('shouldn\'t be able to launch a rocket twice', function () {
    var spy = jasmine.createSpy('spy');
    var rocket = new Rocket();
    rocket.onLaunch(spy);
    rocket.launch();
    rocket.launch();
    expect(spy.callCount).toBe(1);
  });
});
