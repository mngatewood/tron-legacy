const { assert } = require('chai');
const Game = require('../lib/Game.js');
const Cycle = require('../lib/Cycle.js');
const Trail = require('../lib/Trail.js');

describe('Game',() => {

	it('should instantiate two Players', () => {
		let game = new Game();
		let cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
		let cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
		assert.deepEqual(game.cycle1, cycle1);
		assert.deepEqual(game.cycle2, cycle2);
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

	it('should start game at level 0', () => {
		let game = new Game();
		assert.equal(game.gameLevel, 0);
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
		let cycle1 = new Cycle(350, 350, 10, 10, 180, 'red');
		game.buildTrail(cycle1.x, cycle1.y, cycle1.w, cycle1.h, cycle1.direction);
		assert.equal(game.trails[0].x, 360);
		cycle1.move()
		game.buildTrail(cycle1.x, cycle1.y, cycle1.w, cycle1.h, cycle1.direction);
		assert.equal(game.trails[1].x, 359);
		cycle1.move()
		game.buildTrail(cycle1.x, cycle1.y, cycle1.w, cycle1.h, cycle1.direction);
		assert.equal(game.trails[2].x, 358);
		cycle1.move()
		game.buildTrail(cycle1.x, cycle1.y, cycle1.w, cycle1.h, cycle1.direction);
		assert.equal(game.trails[3].x, 357);
		assert.deepEqual(game.trails.length, 4);
	});

	// error: document is undefined
	// it('should clear all texts once game starts', () => {
	// 	game.startGame();
	// 	assert.equal(game.gameText[0].innerText, '');
	// 	assert.equal(game.gameText[1].innerText, '');
	// 	assert.equal(game.gameText[2].innerText, '');
	// });	

	// error: document is undefined
	// it('should display winner of the round', () => {
	// 	let game = new Game();
	// 	game.end('red');
	// 	assert.equal('game.color', 'red');
	// 	assert.equal('game.roundWinner', 2);
	// });

	it('should convert player scores array to unique values only', () => {
		let game = new Game();
		let a = [1, 1, 1, 2, 2, 2, 3, 3, 3]
		let unique = a.filter(game.onlyUnique);
		assert.equal(unique.length, 3)
	});

	it('should reset lightcycles to their starting position', () => {
		let game = new Game();
		let cycles = [];
		let cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
		let cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
		game.makeCycles();
		cycles.forEach(function(cycle) {
			cycle.move();
			cycle.move();
			cycle.move();
			cycle.move();
			cycle.move();
		});
		game.resetCycles();
		assert.equal(game.cycles[0].x, 0);
    assert.equal(game.cycles[0].y, 345);
    assert.equal(game.cycles[0].direction, 0);
    assert.equal(game.cycles[1].x, 690);
    assert.equal(game.cycles[1].y, 345);
    assert.equal(game.cycles[1].direction, 180);
	})

	it('should clear all instances of trails', () => {
		let game = new Game();
		let cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
		let cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
		game.makeCycles();
		game.cycles.forEach(function(cycle) {
			cycle.move();
			game.buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
			cycle.move();
			game.buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
			cycle.move();
			game.buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
			cycle.move();
			game.buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
			cycle.move();
			game.buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
		});
		assert.equal(game.trails.length, 10);
		game.resetTrails()
		assert.equal(game.trails.length, 0);
	})

	it('should create obstacles', () => {
		let game = new Game();
    game.createObstacles(110, 110);
    game.createObstacles(110, 510);
    game.createObstacles(310, 310);
    game.createObstacles(510, 510);
    game.createObstacles(510, 110);
    assert.equal(game.trails.length, 480);
	})
	
	//error: Cannot set property 'fillStyle' of undefined
	// it('should make disks', () => {
	// 	let game = new Game();
	// 	for (var i = 0; i < 1000; i++) {
	// 		game.makeDisk();
	// 	}
	// 	assert.isAbove(game.disks.length, 1);
	// })

	//error: Cannot set property 'fillStyle' of undefined
	// it('should move disks', () => {
	// 	let game = new Game();
	// 	for (var i = 0; i < 1000; i++) {
	// 		game.makeDisk();
	// 	}
	// 	let before = game.disks;
	// 	game.moveDisk();
	// 	let after = game.disks;
	// 	assert.notDeepEqual(before, after);
	// })

	//error: Cannot set property 'fillStyle' of undefined
	// it('should clear all instances of disks', () => {
	// 	let game = new Game();
	// 	for (var i = 0; i < 1000; i++) {
	// 		game.makeDisk();
	// 	}
	// 	assert.isAbove(game.disks.length, 1);
	// 	game.resetDisks();
	// 	assert.equal(game.disks.length, 0);
	// })



});
