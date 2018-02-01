var assert = require('chai').assert;
var Cycle = require('../lib/Cycle');

describe('Cycle', function () {

  it('should ignstantiate a cycle', function () {
    var cycle = new Cycle();
    assert.isObject(cycle);
  });

  it('should have x, y, w, h, direction, and color', function () {
    var cycle = new Cycle(50, 100, 10, 10, 0, 'red');
    assert.equal(cycle.x, '50');
    assert.equal(cycle.y, '100');
    assert.equal(cycle.w, '10');
    assert.equal(cycle.h, '10');
    assert.equal(cycle.direction, '0');
    assert.equal(cycle.color, 'red');
  });

  it('should move itself (right)', function () {
    var cycle = new Cycle(50, 100, 10, 10, 0, 'red');
    cycle.move();
    assert.equal(cycle.x, 51);
  })

  it('should move itself (down)', function () {
    var cycle = new Cycle(50, 100, 10, 10, 90, 'red');
    cycle.move();
    assert.equal(cycle.y, 101);
  })

  it('should move itself (left)', function () {
    var cycle = new Cycle(50, 100, 10, 10, 180, 'red');
    cycle.move();
    assert.equal(cycle.x, 49);
  })

  it('should move itself (up)', function () {
    var cycle = new Cycle(50, 100, 10, 10, 270, 'red');
    cycle.move();
    assert.equal(cycle.y, 99);
  })

});