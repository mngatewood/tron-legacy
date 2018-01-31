var Cycle = require('./Cycle.js');
var Trail = require('./Trail.js');
var gameText = document.querySelector('#game-text');

class Game {
  constructor() {
    this.cycles = [];
    this.cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
    this.cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
    this.trails = [];
    this.trail = new Trail(this.x, this.y);
    this.on = false;
    this.levelUp = 0;
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
    this.trails.push(this.trail);
  }

  startGame() {
    gameText.innerText = '';
  }

  end() {
    gameText.innerText = 'GAME OVER \n Press Return to Restart Game';
  }
}

module.exports = Game;