var { assert } = require('chai');
var Disk = require('../lib/Disk.js');

describe('Disk', () => {
	it('should instantiate a disk', () => {
		var disk = new Disk();
		assert.isObject(disk);
	});

	it('should have x, y, w, h, direction and color', () => {
		var disk = new Disk(10, 10, 10, 10, 30, 'white');
		assert.equal(disk.x, 10);
		assert.equal(disk.y, 10);
		assert.equal(disk.w, 10);
		assert.equal(disk.h, 10);
		assert.equal(disk.direction, 30);
		assert.equal(disk.color, 'white');
	});

});