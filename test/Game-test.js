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
		game.makeCycles();
		assert.equal(game.cycles.length, 2);
		assert.deepEqual(game.cycles[0], cycle1);
		assert.deepEqual(game.cycles[1], cycle2); 
	});

	it('should leave light trails behind during the race', () => {
		let game = new Game();
		// let trail = new Trail(20, 20, 10, 10, 270);
		game.buildTrail(100, 100, 10, 10, 0);
		assert.equal(trail.x, 90);
		game.buildTrail(100, 100, 10, 10, 90);
		assert.equal(trail.y, 90);
		game.buildTrail(100, 100, 10, 10, 180);
		assert.equal(trail.x, 110);
		game.buildTrail(100, 100, 10, 10, 270);
		assert.equal(trail.y, 110);
		assert.deepEqual(this.trails.length, 1);
	});

		it('should clear all texts once game starts', () => {
			let game = new Game();
			game.gameText;
			game.startGame();
			assert.equal(game.gameText[0].innerText, '');
			assert.equal(game.gameText[1].innerText, '');
			assert.equal(game.gameText[2].innerText, '');
		});	

		it('should display winner of the round', () => {
			let game = new Game();
			game.end();
			assert.equal('game.color', red);
			assert.equal('game.roundWinner', 2);
		});
});
