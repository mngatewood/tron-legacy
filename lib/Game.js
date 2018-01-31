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
    console.log(this.gameLevel)

//gameLevel is broken, adding too many
    this.gameLevel 
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



}

module.exports = Game;