const Cycle = require('./Cycle.js');
const Trail = require('./Trail.js');
const Disk = require('./Disk.js');

class Game {
  constructor() {
    this.cycles = [];
    this.cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
    this.cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
    this.trails = [];
    this.trail = new Trail(this.x, this.y);
    this.disks = [];
    this.disk = new Disk(this.x, this.y, 10, 10, this.direction, this.color);
    this.on = false;
    this.levelStarted = false;
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

  resetDisks() {
    this.disks = [];
  }

  createObstacles(x, y) {
    var trail = new Trail (x, y);

    //create a 6x6 square trail
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        trail = new Trail (x, y);

        this.trails.push(trail);
        x += 10;
      }
      x -= 60;
      y += 10;
    }
    //create a 4x4 square trail
    x += 10;
    y -= 50;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        trail = new Trail (x, y);

        this.trails.push(trail);
        x += 10;
      }
      x -= 40;
      y += 10;
    }
    //create a 10x10 cross trail
    x -= 30;
    y -= 30;
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 10; j++) { 
        trail = new Trail (x, y);

        this.trails.push(trail);
        x += 10;
      }
      x -= 100;
      y += 10;
    }
    x += 50;
    y -= 60;
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 10; j++) {
        trail = new Trail (x, y);

        this.trails.push(trail);
        y += 10;
      }
      x -= 10;
      y -= 100;
    }
    //create a 2x2 square trail
    x += 10;
    y += 40;
    for (i = 0; i < 2; i++) {
      for (j = 0; j < 2; j++) {
        trail = new Trail (x, y);

        this.trails.push(trail);
        x += 10;
      }
      x -= 20;
      y += 10;
    }
  }

  makeDisk(ctx) {
    var x, y, color, disk, direction;

    switch (Math.floor(Math.random() * 500)) {
    case 1: x = 0;
      y = Math.floor(Math.random() * 690);
      color = 'white';
      disk = new Disk(x, y, 10, 10, direction, color);
      this.disks.push(disk);
      break;
    case 2: x = 690;
      y = Math.floor(Math.random() * 690);
      color = 'red';
      disk = new Disk(x, y, 10, 10, direction, color);
      this.disks.push(disk);
      break;
    case 3: y = 0;
      x = Math.floor(Math.random() * 690);
      color = 'blue';
      disk = new Disk(x, y, 10, 10, direction, color);
      this.disks.push(disk);
      break;
    case 4: y = 690;
      x = Math.floor(Math.random() * 690);
      color = 'yellow';
      disk = new Disk(x, y, 10, 10, direction, color);
      this.disks.push(disk);
      break;
    }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
  }

  moveDisk(ctx) {
    this.disks.forEach(function(disk) {
      ctx.clearRect(disk.x, disk.y, disk.w, disk.h);
      if (disk.color === 'white') {
        disk.x++;
      } else if (disk.color === 'red') {
        disk.x--;
      } else if (disk.color === 'blue') {
        disk.y++;
      } else if (disk.color === 'yellow') {
        disk.y--;
      }
      ctx.fillStyle = disk.color;
      ctx.fillRect(disk.x, disk.y, disk.w, disk.h);
      return this;
    });
  }
}

module.exports = Game;