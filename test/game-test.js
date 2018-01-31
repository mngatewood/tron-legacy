const { assert } = require('chai');
const Game = require('../lib/Game.js');
const Cycle = require('../lib/Cycle.js');
const Trail = require('../lib/Trail.js');

describe('Game',() => {

	it('should instantiate two Players', () => {
		let cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
		let cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
		assert.isObject(cycle1, cycle2);
	});

	it('should prepare player\'s lightcycles and trails', () => {
		let game = new Game();
		assert.deepEqual(game.cycles, []);
		assert.deepEqual(game.trails, []);
	});

	it('should instantiate new trail', () => {
		let trail = new Trail();
		assert.isObject(trail);
	});

	it('should not start game at page load', () => {
		let game = new Game();
		assert.equal(game.on, false);
	});

	it('should start game at level 1', () => {
		let game = new Game();
		assert.equal(game.gameLevel, 1);
	});

	it('should add lightcycles to the arena', () => {
		let game = new Game();
		let cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
		let cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
		game.makeCycles(cycle1, cycle2);
		assert.equal(game.cycles.length, 2);
		assert.deepEqual(game.cycles[0], cycle1);
		assert.deepEqual(game.cycles[1], cycle2); 
	});

	it('should leave light trails behind during the race', () => {
		let game = new Game();
		let trail = new Trail(20, 20);
		let 
		game.buildTrail(cycle.x, trail.y, trail.w, trail.h, trail.direction);
		assert.equal(trail.x, trail.x - trail.w);

	});


});