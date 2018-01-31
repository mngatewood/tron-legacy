var Game = require('./Game.js');
var game = new Game();

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// var cycle1 = new Cycle(0, 345, 10, 10, 0, 'red');
// var cycle2 = new Cycle(690, 345, 10, 10, 180, 'blue');
// var trails = [];
// var gameOn = false;
// var gameLevel = 1;

var sound = document.getElementById('soundtrack');

//moved here so it doesn't make a hundred cycles
game.makeCycles();

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {
    console.log(e);
    playSound();
    setupLevel()
    // loop();        
  }
});

function loop() { 
  if (game.on === true) {
    requestAnimationFrame(loop);
    game.cycles.forEach(function(cycle) {
      cycle.erase(ctx).drawTrail(ctx).move().draw(ctx);
      game.buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
      crashCycles();
      crashTrails(cycle.x, cycle.y, cycle.w, cycle.h);
      crashBoundary(cycle.x, cycle.y, cycle.w, cycle.h);
    });
  }
}    

// drawBackground();
// game.buildTrail();
// crashCycles();
// crashTrails(); 
// crashBoundary();
// setupLevel();

function crashBoundary(x, y, w, h) {
  if (x < 0 || x > (canvas.width - w) || y < 0 || y > (canvas.height - h)) {
    game.on = false;
    game.end();
    explode(x, y);

  }
}

function crashCycles() {
  if (game.cycle1.x < game.cycle2.x + game.cycle2.w && 
    game.cycle1.x + game.cycle1.w > game.cycle2.x &&
    game.cycle1.y < game.cycle2.y + game.cycle2.h &&
    game.cycle1.h + game.cycle1.y > game.cycle2.y) {
    var x = ((game.cycle1.x + game.cycle2.x) / 2) + (game.cycle1.w / 2);
    var y = ((game.cycle1.y + game.cycle2.y) / 2) + (game.cycle1.h / 2);
    
    game.on = false;
    game.end();
    explode(x, y);

  }
}

function crashTrails(x, y, w, h) {
  game.trails.forEach(function(trail) {
    if (x < trail.x + trail.w && 
    x + w > trail.x &&
    y < trail.y + trail.h &&
    h + y > trail.y) {
      x += 5;
      y += 5;
      game.on = false;
      game.end();
      explode(x, y);

    }     
  });
}

//animate explosion
function explode(x, y) { 
  var i = 1;
  var radius = i;
  var color = "rgb(255, 0, 0)";
  var delay = 10;
  var opacity = 0.1 - (radius / 100);

  function explosionLoop () {
    setTimeout(function () { 
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, (radius / 2), 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "rgb(255, 255, 0)";
      ctx.stroke();
      if (i <= 50) {
        i++;
        radius++;
        explosionLoop();
      } else if (i > 50 && i <= 100) {
        i += 0.5;
        radius = i - 50;
        color = "rgb(255, 255, 0)";
        explosionLoop();
      } else if (i > 100 && i <= 200) {
        i += 0.5;
        radius = i - 100;
        color = "rgb(112, 140, 152)";
        explosionLoop();
      } else if (i > 200 && i < 2200) {
        i = i + 10;
        radius = i - 150;
        color = "rgb(0, 0, 0)";
        delay = 0;
        opacity = 1;
        explosionLoop();
      }
    }, delay);
  } 
  explosionLoop();
  // game.end();

//  re-used original event listener to fix firing multiple events

//   document.addEventListener('keydown', function(e) {
//     if (e.keyCode === 13) {

// //this is part of our problem ------------------
//       console.log(e);
// //kepress is returning 19 events!!!!!!!!!!!!!!!!!

//       setupLevel();
//       console.log("C1 x" + game.cycle1.x);
//       console.log("C2 x" + game.cycle2.x);
//       game.on = !game.on;
//       loop(60);        
//     }
//   });  
}

function setupLevel() {
  game.resetCycles();
  game.resetTrails();
  drawBackground();
  if (game.gameLevel !== 1) {
    drawObstacles(110, 110);
    drawObstacles(110, 510);
    drawObstacles(310, 310);
    drawObstacles(510, 510);
    drawObstacles(510, 110);
    // game.createObstacles(110, 110);
    // game.createObstacles(110, 510);
    // game.createObstacles(310, 310);
    // game.createObstacles(510, 510);
    // game.createObstacles(510, 110);
  }
  game.on = !game.on;
  game.startGame();
  loop(60);        
}

//draw grid over black background
function drawBackground() {
  let x = 0;
  let y = 0;

  for (var i = 0; i < 14; i++) {

    for (var j = 0; j < 14; j++) {

      ctx.fillStyle = "rgb(0, 100, 100)";
      ctx.fillRect(x + 0, y + 0, 50, 50);
      ctx.fillStyle = "rgb(0, 50, 100)";
      ctx.fillRect(x + 1, y + 1, 48, 48);
      ctx.fillStyle = "rgb(5, 40, 100)";
      ctx.fillRect(x + 3, y + 3, 44, 44);
      ctx.fillStyle = "rgb(0, 5, 40)";
      ctx.fillRect(x + 5, y + 5, 40, 40);
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(x + 10, y + 10, 30, 30);
      y += 50;
    }
    x += 50;
    y = 0;
  }
}


//draw one obstacle at x, y
function drawObstacles(x, y) {

//need to fix this
//obstacles need to push trails into trails array

  // var trail = new Trail (x, y);
  // trails.push(trail);

  // draw gradient (no trails)
  ctx.fillStyle = "rgba(5, 50, 129, 0.5)";
  ctx.fillRect(x, y, 80, 80);
  x += 10;
  y += 10;
  //draw a 6x6 square
  ctx.fillStyle = "rgba(211, 222, 229, 0.5)";
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      ctx.fillRect(x, y, 10, 10);
      x += 10;
    }
    x -= 60;
    y += 10;
  }
  //draw a 4x4 square
  x += 10;
  y -= 50;
  ctx.fillStyle = "rgb(119, 138, 163)";
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      ctx.fillRect(x, y, 10, 10);
      x += 10;
    }
    x -= 40;
    y += 10;
  }
  //draw a 10x10 cross
  x -= 30;
  y -= 30;
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 10; j++) { 
      ctx.fillStyle = "rgba(138, 224, 252, 0.9)";
      ctx.fillRect(x, y, 10, 10);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.strokeRect(x, y, 10, 10);      
      x += 10;
    }
    x -= 100;
    y += 10;
  }
  x += 50;
  y -= 60;
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 10; j++) {
      ctx.fillStyle = "rgba(138, 224, 252, 0.9)";
      ctx.fillRect(x, y, 10, 10);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.strokeRect(x, y, 10, 10);      
      y += 10;
    }
    x -= 10;
    y -= 100;
  }
  //draw a 2x2 square
  x += 10;
  y += 40;
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      ctx.fillStyle = "rgba(237, 81, 44, 0.8)";
      ctx.fillRect(x, y, 10, 10);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
      ctx.strokeRect(x, y, 10, 10);
      x += 10;
    }
    x -= 20;
    y += 10;
  }
}

// play and pause soundtrack
function playSound() {
  if (game.on === false) {
    sound.pause();
  } else {
    sound.play();
  }
}

// listen for key press
window.addEventListener('keydown', turn);

// evaluate key press and turn cycle
function turn(e) {
  if (e.keyCode === 87 && game.cycle1.direction !== 90) { //w
    game.cycle1.direction = 270;
  } else if (e.keyCode === 83 && game.cycle1.direction !== 270) { //s
    game.cycle1.direction = 90;
  } else if (e.keyCode === 65 && game.cycle1.direction !== 0) { //a
    game.cycle1.direction = 180; 
  } else if (e.keyCode === 68 && game.cycle1.direction !== 180) { //d
    game.cycle1.direction = 0; 
  } else if (e.keyCode === 38 && game.cycle2.direction !== 90) { //up-arrow
    game.cycle2.direction = 270; 
  } else if (e.keyCode === 40 && game.cycle2.direction !== 270) { //down-arrow
    game.cycle2.direction = 90; 
  } else if (e.keyCode === 37 && game.cycle2.direction !== 0) { //left-arrow
    game.cycle2.direction = 180;
  } else if (e.keyCode === 39 && game.cycle2.direction !== 180) { //right-arrow
    game.cycle2.direction = 0;
  }
}

// direction control needs prevent reverse direction
// document.onkeydown = function(e) {
//   switch (e.keyCode) {
//     case 87: 
//     cycle1.direction = 270;
//     cycle1.direction !== 90;
//     break;
//     case 68: cycle1.direction = 0;
//     break;
//     case 83: cycle1.direction = 90;
//     break;
//     case 65: cycle1.direction = 180;
//     break;
//     case 38: cycle2.direction = 270;
//     break;
//     case 39: cycle2.direction = 0;
//     break;
//     case 40: cycle2.direction = 90;
//     break;
//     case 37: cycle2.direction = 180;
//     break;
//   }
// }

// another approach to storing keyboard events 
// const direction = {
//   'key87': () => 
// }; 