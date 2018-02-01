var Cycle = require('./Cycle.js');
var Trail = require('./Trail.js');
var Disk = require('./Disk.js')

var p1Scores = [];
var p2Scores = [];

class Game {
  constructor() {
    this.cycles = [];
    this.cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
    this.cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
    this.trails = [];
    this.trail = new Trail(this.x, this.y);
    this.disks = [];
    this.disk = new Trail(this.x, this.y);
    this.on = false;
    this.gameLevel = 0;
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
    var trail = new Trail (x, y);
    this.trails.push(trail);
  }

  startGame() {
    var gameText = document.querySelectorAll('.game-text');
    gameText[0].innerText = '';
    gameText[1].innerText = '';
    gameText[2].innerText = '';
  }

  end(color) {
    var gameText = document.querySelectorAll('.game-text');
    var roundWinner;
    var battleWinner;
    var scoreUpdated = false;
    if(color === 'red') {
      roundWinner = 2;
      p2Scores.push(this.gameLevel)
    } else {
      roundWinner = 1;
      p1Scores.push(this.gameLevel)
    }
    if(this.gameLevel === 1) {
      gameText[0].innerText = 'Round ' + this.gameLevel + ' is over. \n \n \n Player ' + roundWinner + ' wins this round. \n \n ';
      gameText[1].innerText = 'In Round 2, you must avoid additional obstacles placed throughout the arena. \n \n \n \n';
      gameText[2].innerText = 'Press Spacebar to Enter the Grid';
    } else if(this.gameLevel === 2) {
      gameText[0].innerText = 'Round ' + this.gameLevel + ' is over. \n \n \n Player ' + roundWinner + ' wins this round. \n \n ';
      gameText[1].innerText = 'In Round 3, you must avoid the discs flying throughout the arena. \n \n \n \n';
      gameText[2].innerText = 'Press Spacebar to Enter the Grid';
    } else {
    var p1unique = p1Scores.filter(this.onlyUnique);
    var p2unique = p2Scores.filter(this.onlyUnique);
      if(p1unique.length > p2unique.length) {
        battleWinner = 1;
      } else {
        battleWinner = 2;
      }
        gameText[0].innerText = 'GAME OVER \n \n \n Player ' + roundWinner + ' wins this round. \n \n ';
        gameText[1].innerText = 'Congratulations, Player ' + battleWinner + '.  You have won the battle. \n \n \n \n';
        gameText[2].innerText = 'Press Spacebar to Restart Game'; 
        this.gameLevel = 0; 
        p1Scores = [];
        p2Scores = [];
    }
  }

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }

  resetCycles() {
    this.cycle1.x = 0;
    this.cycle1.y = 345;
    this.cycle1.direction = 0;
    this.cycle2.x = 690;
    this.cycle2.y = 345;
    this.cycle2.direction = 180;
  }

  resetTrails() {
    this.trails = [];
  }


  createObstacles(x, y) {

    //create a 6x6 square trail
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        var trail = new Trail (x, y);
        this.trails.push(trail);
        x += 10;
      }
      x -= 60;
      y += 10;
    }
    //create a 4x4 square trail
    x += 10;
    y -= 50;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        var trail = new Trail (x, y);
        this.trails.push(trail);
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
        this.trails.push(trail);
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
        this.trails.push(trail);
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
        this.trails.push(trail);
        x += 10;
      }
      x -= 20;
      y += 10;
    }
  }

  makeDisk(ctx) {
    var x, y, direction, color;
    switch(Math.floor(Math.random() * 500)) {
      case 1: x = 0;
        y = Math.floor(Math.random() * 690);
        direction = Math.floor(Math.random() * 360);
        color = 'white';
        var disk = new Disk(x, y, 10, 10, direction, color);
        this.disks.push(disk);
        break;
      case 2: x = 690;
        y = Math.floor(Math.random() * 690);
        direction = Math.floor(Math.random() * 360);
        color = 'red';
        var disk = new Disk(x, y, 10, 10, direction, color);
        this.disks.push(disk);
        break;
      case 3: y = 0;
        x = Math.floor(Math.random() * 690);
        direction = Math.floor(Math.random() * 360);
        color = 'blue';
        var disk = new Disk(x, y, 10, 10, direction, color);
        this.disks.push(disk);
        break;
      case 4: y = 690;
        x = Math.floor(Math.random() * 690);
        direction = Math.floor(Math.random() * 360);
        color = 'yellow';
        var disk = new Disk(x, y, 10, 10, direction, color);
        this.disks.push(disk);
        break;
    }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10, direction, color);
  }

  moveDisk(ctx) {
    this.disks.forEach(function(disk) {
      ctx.clearRect(disk.x, disk.y, disk.w, disk.h);
      if(disk.color === 'white') {
        disk.x++;
      } else if(disk.color === 'red') {
        disk.x--;
      } else if(disk.color === 'blue') {
        disk.y++;
      } else if(disk.color === 'yellow') {
        disk.y--;
      }
      ctx.fillStyle = disk.color;
      ctx.fillRect(disk.x, disk.y, disk.w, disk.h);
      return this;
    })
  }
}

module.exports = Game;