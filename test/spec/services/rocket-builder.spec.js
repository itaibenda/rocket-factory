'use strict';

describe('Service: rocketBuilder', function () {
  // load the service's module
  beforeEach(function () {
    module('rocketFactoryAppInternal');
  });

  describe('with default init', function () {
    var rocketBuilder, myRocketBuilder, mockRocketFactory, mockRocket;

    beforeEach(function () {
      mockRocketFactory = jasmine.createSpy('mockRocketFactory').andCallFake(function () {
        return mockRocket;
      });

      module({
        Rocket: mockRocketFactory
      });
    });

    beforeEach(inject(function (_rocketBuilder_) {
      rocketBuilder = _rocketBuilder_;
    }));

    beforeEach(function () {
      myRocketBuilder = rocketBuilder.create();
    });

    it('should have default options', function () {
      expect(myRocketBuilder.getOptions().buildTimeMS).toEqual(5000);
    });

    it('should trigger onStart when it starts building rockets', function () {
      var spy = jasmine.createSpy('start');
      myRocketBuilder.onStart(spy);
      myRocketBuilder.start();

      expect(spy).toHaveBeenCalledWith(myRocketBuilder);
    });

    it('should create a rocket on $interval tick', inject(function ($interval) {
      mockRocket = {
        name: 'mock rocket name'
      };

      var spy = jasmine.createSpy('new rocket');
      myRocketBuilder.onNewRocket(spy);
      myRocketBuilder.start();

      $interval.flush(5000);

      expect(spy).toHaveBeenCalledWith(mockRocket, myRocketBuilder);
    }));

    it('should create a different on each $interval tick', inject(function ($interval) {
      mockRocket = {
        name: 'rocket1'
      };

      var spy = jasmine.createSpy('new rocket');
      myRocketBuilder.onNewRocket(spy);
      myRocketBuilder.start();

      $interval.flush(5000);

      expect(spy).toHaveBeenCalledWith(mockRocket, myRocketBuilder);
      spy.reset();

      mockRocket = {
        name: 'rocket2'
      };

      $interval.flush(5000);
      expect(spy).toHaveBeenCalledWith(mockRocket, myRocketBuilder);
    }));

    it('should trigger onStop when it stops building rockets', function () {
      var spy = jasmine.createSpy('onStop');

      myRocketBuilder.onStop(spy);
      myRocketBuilder.stop();

      expect(spy).toHaveBeenCalledWith(myRocketBuilder);
    });

    it('should stop creating rockets when the stop is called', inject(function ($interval) {
      mockRocket = {
        name: 'rocket1'
      };

      var spy = jasmine.createSpy('new rocket');
      myRocketBuilder.onNewRocket(spy);
      myRocketBuilder.start();

      $interval.flush(5000);

      expect(spy).toHaveBeenCalledWith(mockRocket, myRocketBuilder);
      spy.reset();

      myRocketBuilder.stop();
      $interval.flush(5000);

      expect(spy).not.toHaveBeenCalled();
    }));
  });


  describe('with custom init', function () {
    it('should allow to set a rocket build time', function () {
      angular.module('rocketFactoryAppInternal').config(function (rocketBuilderProvider) {
        rocketBuilderProvider.setBuildTime(2000);
      });

      inject(function (rocketBuilder) {
        var myRocketBuilder = rocketBuilder.create();
        expect(myRocketBuilder.getOptions().buildTimeMS).toEqual(2000);
      });
    });
  });

});
