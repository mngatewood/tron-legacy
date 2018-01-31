var assert = require('chai').assert;
var Trail = require('../lib/Trail');

describe('Trail', function () {

  it('should instantiate a trail', function () {
    var trail = new Trail();
    assert.isObject(trail);
  });

  it('should have x, y, w, h', function () {
    var trail = new Trail(50, 100, 10, 10);
    assert.equal(trail.x, '50');
    assert.equal(trail.y, '100');
    assert.equal(trail.w, '10');
    assert.equal(trail.h, '10');
  });

});