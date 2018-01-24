
var Cycle = require('./Cycle.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var cycles = [cycle1, cycle2];
var cycle1 = new Cycle(0, 345, 10, 10, 0);
var cycle2 = new Cycle(690, 345, 10, 10, 180);

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
      cycle2.erase(ctx).drawTrail(ctx).move().draw(ctx);
    });
    requestAnimationFrame(loop);
  }
}
requestAnimationFrame(loop);        

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