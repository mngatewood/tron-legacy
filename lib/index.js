
var Cycle = require('./Cycle.js');
var Trail = require('./Trail.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var cycles = [cycle1, cycle2];
var cycle1 = new Cycle(0, 345, 10, 10, 0);
var cycle2 = new Cycle(690, 345, 10, 10, 180);
var trails = []

var gameOn = false;

document.body.onkeydown = function(e) {
  if (e.keyCode === 32) {
    gameOn = !gameOn;
    requestAnimationFrame(loop);        
  }
};

function loop() { 
  if (gameOn === true) {
    cycles.forEach(function() {
      cycle1.erase(ctx).drawTrail(ctx).move().draw(ctx);
      buildTrail(cycle1.x, cycle1.y, cycle1.w, cycle1.h, cycle1.direction);
      crashTrails(cycle1.x, cycle1.y, cycle1.w, cycle1.h);
      // crashBoundary(cycle1.x, cycle1.y, cycle1.w, cycle1.h)
      cycle2.erase(ctx).drawTrail(ctx).move().draw(ctx);
      buildTrail(cycle2.x, cycle2.y, cycle2.w, cycle2.h, cycle2.direction);
      crashTrails(cycle2.x, cycle2.y, cycle2.w, cycle2.h);
      // crashBoundary(cycle1.x, cycle1.y, cycle1.w, cycle1.h)
      crashCycles();
    });
    requestAnimationFrame(loop);
  }
}    

function crashCycles() {
  if (cycle1.x < cycle2.x + cycle2.w && 
    cycle1.x + cycle1.w > cycle2.x &&
    cycle1.y < cycle2.y + cycle2.h &&
    cycle1.h + cycle1.y > cycle2.y) {
      gameOn = false;       
  }
}

function buildTrail(x, y, w, h, direction) {
  if(direction === 0) { //moving right
    x = x - w;
  } else if(direction === 90) { //moving down
    y = y - h;
  } else if(direction === 180) { //moving left
    x = x + w;
  } else if(direction === 270) { //moving up
    y = y + h;
  }
  var trail = new Trail (x, y);
  trails.push(trail);
}

function crashTrails(x, y, w, h) {
  trails.forEach(function(trail) {
    if(x < trail.x + trail.w && 
    x + w > trail.x &&
    y < trail.y + trail.h &&
    h + y > trail.y) {
      gameOn = false;
    }     
  })
}

// function crashBoundary(x, y, w, h) {
//   if (cycle goes outside boundary) {
//     gameOn = false;
//   }
// }

window.addEventListener('keydown', turn);

function turn(e) {
  if (e.keyCode === 87) { //w
    cycle1.direction = 270;
  } else if (e.keyCode === 83) { //s
    cycle1.direction = 90;
  } else if (e.keyCode === 65) { //a
    cycle1.direction = 180; 
  } else if (e.keyCode === 68) { //d
    cycle1.direction = 0; 
  } else if (e.keyCode === 38) { //up-arrow
    cycle2.direction = 270; 
  } else if (e.keyCode === 40) { //down-arrow
    cycle2.direction = 90; 
  } else if (e.keyCode === 37) { //left-arrow
    cycle2.direction = 180;
  } else if (e.keyCode === 39) { //right-arrow
    cycle2.direction = 0;
  }
}