var Cycle = require('./Cycle.js');
var Trail = require('./Trail.js');
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var cycles = [];
var cycle1 = new Cycle(0, 345, 10, 10, 0);
var cycle2 = new Cycle(690, 345, 10, 10, 180);

cycles.push(cycle1, cycle2);
var trails = [];

var gameText = document.querySelector('#game-text');
var gameOn = false;
var gameLevel = 1;

drawBackground();
setupLevel();

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {
    gameOn = !gameOn;
    requestAnimationFrame(loop);        
  }
});

document.addEventListener('keyup', function(e){
  if (e.keyCode === 13) {
    window.location.reload();
  }
});

function loop() { 
  if (gameOn === true) {
    startGame();
    cycles.forEach(function(cycle) {
      cycle.erase(ctx).drawTrail(ctx).move().draw(ctx);
      buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
      crashTrails(cycle.x, cycle.y, cycle.w, cycle.h);
      crashBoundary(cycle.x, cycle.y, cycle.w, cycle.h);
      crashCycles();
    });
    requestAnimationFrame(loop);
  }
}    

//listen for key press
window.addEventListener('keydown', turn);

//evaluate key press and turn cycle
function turn(e) {
  if (e.keyCode === 87 && cycle1.direction !== 90) { //w
    cycle1.direction = 270;
  } else if (e.keyCode === 83 && cycle1.direction !== 270) { //s
    cycle1.direction = 90;
  } else if (e.keyCode === 65 && cycle1.direction !== 0) { //a
    cycle1.direction = 180; 
  } else if (e.keyCode === 68 && cycle1.direction !== 180) { //d
    cycle1.direction = 0; 
  } else if (e.keyCode === 38 && cycle2.direction !== 90) { //up-arrow
    cycle2.direction = 270; 
  } else if (e.keyCode === 40 && cycle2.direction !== 270) { //down-arrow
    cycle2.direction = 90; 
  } else if (e.keyCode === 37 && cycle2.direction !== 0) { //left-arrow
    cycle2.direction = 180;
  } else if (e.keyCode === 39 && cycle2.direction !== 180) { //right-arrow
    cycle2.direction = 0;
  }
}

//draw grid over black background
function drawBackground() {
  let x = 0;
  let y = 0;
  for(var i = 0; i < 14; i++) {
    for(var j = 0; j < 14; j++) {
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
      y+=50
    }
    x+=50;
    y=0;
  }
}

//cycle collision detection
function crashCycles() {
  if (cycle1.x < cycle2.x + cycle2.w && 
    cycle1.x + cycle1.w > cycle2.x &&
    cycle1.y < cycle2.y + cycle2.h &&
    cycle1.h + cycle1.y > cycle2.y) {
   x = ((cycle1.x + cycle2.x) / 2) + (cycle1.w / 2);
      y = ((cycle1.y + cycle2.y) / 2) + (cycle1.h / 2);
      explode(x, y);
      gameOn = false;
      endGame();
  }
}

//create trail behind cycle and push to trails array
function buildTrail(x, y, w, h, direction) {
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

  trails.push(trail);
}

//cycle collision with trail detection
function crashTrails(x, y, w, h) {
  trails.forEach(function(trail) {
    if (x < trail.x + trail.w && 
    x + w > trail.x &&
    y < trail.y + trail.h &&
    h + y > trail.y) {
      x += 5;
      y += 5;
      explode(x, y);
      gameOn = false;
      endGame();
    }     
  });
}
  
//cycle collision with boundary detection
function crashBoundary(x, y, w, h) {
  if(x < 0 || x > (canvas.width - w) || y < 0 || y > (canvas.height - h)) {
    explode(x, y);
    gameOn = false;
    endGame();
  }
}

//animate explosion
function explode(x, y) { 
  var i = 1;
  var radius = i;
  var color = "rgb(255, 0, 0)";
  var delay = 20;
  var opacity = 0.1 - (radius / 100)
  function explosionLoop () {
    setTimeout(function () { 
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, (radius / 2), 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "rgb(255, 255, 0)";
      ctx.stroke();
      if(i <= 50) {
        i++
        radius ++;
        explosionLoop();
      } else if(i > 50 && i <= 100) {
        i+= 0.5;
        radius = i - 50;
        color = "rgb(255, 255, 0)";
        explosionLoop();
      } else if(i > 100 && i <= 200) {
        i+= 0.5;
        radius = i - 100;
        color = "rgb(112, 140, 152)";
        explosionLoop();
      } else if(i > 200 && i < 2200) {
        i++;
        radius = i - 150;
        color = "rgb(0, 0, 0)";
        delay = 1;
        opacity = 1;
        explosionLoop();
      }
    }, delay);
  }
  explosionLoop();
}

//remove game startup text
function startGame() {
  gameText.innerText = '';
}

//display game over text
function endGame() {
  gameText.innerText = 'GAME OVER \n Press Enter to Restart Game';
}

//draw obstacles for level 2+
function setupLevel() {
  if(gameLevel !== 1) {
    createObstacles(110, 110);
    createObstacles(110, 510);
    createObstacles(310, 310);
    createObstacles(510, 510);
    createObstacles(510, 110);
  }
}

//draw one obstacle at x, y
function createObstacles(x, y) {
  //draw gradient (no trails)
  ctx.fillStyle = "rgba(5, 50, 129, 0.5)";
  ctx.fillRect(x, y, 80, 80);
  x+=10;
  y+=10;
  //draw a 6x6 square
  ctx.fillStyle = "rgba(211, 222, 229, 0.5)";
  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 6; j++) {
        var trail = new Trail (x, y);
        trails.push(trail);
        ctx.fillRect(x, y, 10, 10);
        x+=10
    }
    x-=60;
    y+=10
  }
  //draw a 4x4 square
  x+=10;
  y-=50;
  ctx.fillStyle = "rgb(119, 138, 163)";
  for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
        var trail = new Trail (x, y);
        trails.push(trail);
        ctx.fillRect(x, y, 10, 10);
        x+=10
    }
    x-=40;
    y+=10
  }
  //draw a 10x10 cross
  x-=30;
  y-=30;
  for(var i = 0; i < 2; i++) {
    for(var j = 0; j < 10; j++) {
      var trail = new Trail (x, y);
      trails.push(trail);
      ctx.fillStyle = "rgba(138, 224, 252, 0.9)";
      ctx.fillRect(x, y, 10, 10);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.strokeRect(x, y, 10, 10);      
      x+=10;
      }
    x-=100;
    y+=10;
    }
    x+=50;
    y-=60;
  for(var i = 0; i < 2; i++) {
    for(var j = 0; j < 10; j++) {
      var trail = new Trail (x, y);
      trails.push(trail);
      ctx.fillStyle = "rgba(138, 224, 252, 0.9)";
      ctx.fillRect(x, y, 10, 10);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.strokeRect(x, y, 10, 10);      
      y+=10;
      }
    x-=10;
    y-=100;
    }
  //draw a 2x2 square
  x+=10;
  y+=40;
  for(var i = 0; i < 2; i++) {
    for(var j = 0; j < 2; j++) {
        var trail = new Trail (x, y);
        trails.push(trail);
        ctx.fillStyle = "rgba(237, 81, 44, 0.8)";
        ctx.fillRect(x, y, 10, 10);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
        ctx.strokeRect(x, y, 10, 10);
        x+=10
    }
    x-=20;
    y+=10
  }
}

// //cleaner keypress evaluator 
// var keys = {
  // 87: function() { cycle1.direction = 270 },
  // 83: function() { cycle1.direction = 90 },
  // 65: function() { cycle1.direction = 180 },
  // 68: function() { cycle1.direction = 0 },
  // 38: function() { cycle2.direction = 270 },
  // 40: function() { cycle2.direction = 90 },
  // 37: function() { cycle2.direction = 180 },
  // 39: function() { cycle2.direction = 0 },
// }

