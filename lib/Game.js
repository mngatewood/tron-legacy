var Cycle = require('./Cycle.js');
var Trail = require('./Trail.js');
var gameText = document.querySelectorAll('.game-text');

class Game {
  constructor() {
    this.cycles = [];
    this.cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
    this.cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
    this.trails = [];
    this.trail = new Trail(this.x, this.y);
    this.on = false;
    this.gameLevel = 1;
  }

  makeCycles() {  
    this.cycles.push(this.cycle1, this.cycle2);
  }

  buildTrail(x, y, w, h, direction) {
    if (direction === 0) { //moving right
      x = x - w;
    } else if (direction === 90) { //moving down
      y = y - h;
    } else if (direction === 180) { //moving left
      x = x + w;
    } else if (direction === 270) { //moving up
      y = y + h;
    }
//previous this.trail was not working
    this.trails.push(new Trail(x, y));
  }

  startGame() {
    gameText[0].innerText = '';
    gameText[1].innerText = '';
    gameText[2].innerText = '';
  }

  end() {
    this.gameLevel++
    console.log(this.gameLevel)

// //gameLevel is broken, adding too many
    this.gameLevel ++;
    console.log(this.gameLevel)
    if(this.gameLevel === 2) {
        gameText[0].innerText = 'GAME OVER \n \n \n Player X wins this round. \n \n ';
        gameText[1].innerText = 'In Round 2, you must avoid additional obstacles placed throughout the arena. \n \n \n \n';
      setTimeout(function() {
        gameText[2].innerText = 'Press Spacebar to Enter the Grid';
      }, 5000)
    }
    if(this.gameLevel === 3) {
        gameText[0].innerText = 'GAME OVER \n \n \n Player X wins this round. \n \n ';
        gameText[1].innerText = 'In Round 3, you must avoid the discs flying throughout the arena. \n \n \n \n';
      setTimeout(function() {
        gameText[2].innerText = 'Press Spacebar to Enter the Grid';
      }, 5000)
    }
  }

  resetCycles() {
    this.cycle1.x = 0;
    this.cycle1.y = 345;
    this.cycle1.direction = 0;
    this.cycle2.x = 690;
    this.cycle2.y = 345;
    this.cycle2.direction = 180;
    console.log("C1 x" + this.cycle1.x);
    console.log("C2 x" + this.cycle2.x);
  }

  resetTrails() {
    console.log("Trails before reset: " + this.trails)
    this.trails = [];
    console.log("Trails after reset: " + this.trails)      
  }


createObstacles(x, y) {

//need to fix this
//obstacles need to push trails into trails array

  // var trail = new Trail (x, y);
  // trails.push(trail);

  //create a 6x6 square trail
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      var trail = new Trail (x, y);
      game.trails.push(trail);
      x += 10;
    }
    x -= 60;
    y += 10;
  }
  //create a 4x4 square trail
  x += 10;
  y -= 50;
  ctx.fillStyle = "rgb(119, 138, 163)";
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var trail = new Trail (x, y);
      game.trails.push(trail);
      x += 10;
    }
    x -= 40;
    y += 10;
  }
  //create a 10x10 cross trail
  x -= 30;
  y -= 30;
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 10; j++) { 
      var trail = new Trail (x, y);
      game.trails.push(trail);
      x += 10;
    }
    x -= 100;
    y += 10;
  }
  x += 50;
  y -= 60;
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 10; j++) {
      var trail = new Trail (x, y);
      game.trails.push(trail);
      y += 10;
    }
    x -= 10;
    y -= 100;
  }
  //create a 2x2 square trail
  x += 10;
  y += 40;
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      var trail = new Trail (x, y);
      game.trails.push(trail);
      x += 10;
    }
    x -= 20;
    y += 10;
  }
}


}

module.exports = Game;