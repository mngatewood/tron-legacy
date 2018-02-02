var Game = require('./Game.js');
var game = new Game();
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var gameText = document.querySelectorAll('.game-text');
var sound = document.getElementById('soundtrack');
var p1Scores = [];
var p2Scores = [];

game.makeCycles();

document.addEventListener('keydown', function(e) {
  //begin level
  if (e.keyCode === 13 && game.levelStarted === false) {
    game.levelStarted = true;
    playSound();
    setupLevel();
  }
  //pause game
  if (e.keyCode === 32 && game.levelStarted === true) {
    game.on = !game.on;
    if (game.on === true) {
      loop();
    }
  }
});

// play and pause soundtrack
function playSound() {
  if (game.on === false) {
    sound.pause();
  } else {
    sound.play();
  }
}

function loop() { 
  if (game.on === true) {
    requestAnimationFrame(loop);
    game.cycles.forEach(function(cycle) {
      cycle.erase(ctx).drawTrail(ctx).move().draw(ctx);
      game.buildTrail(cycle.x, cycle.y, cycle.w, cycle.h, cycle.direction);
      if (game.gameLevel === 3) {
        game.makeDisk(ctx);
        game.moveDisk(ctx);
      }
      crashCycles(cycle.color);
      crashTrails(cycle.x, cycle.y, cycle.w, cycle.h, cycle.color);
      crashBoundary(cycle.x, cycle.y, cycle.w, cycle.h, cycle.color);
      crashDisks(cycle.x, cycle.y, cycle.w, cycle.h, cycle.color);
    });
  }
}    


function crashBoundary(x, y, w, h, color) {
  if (x < 0 || x > (canvas.width - w) || y < 0 || y > (canvas.height - h)) {
    explode(x, y, color);
  }
}

function crashCycles(color) {
  if (game.cycle1.x < game.cycle2.x + game.cycle2.w && 
    game.cycle1.x + game.cycle1.w > game.cycle2.x &&
    game.cycle1.y < game.cycle2.y + game.cycle2.h &&
    game.cycle1.h + game.cycle1.y > game.cycle2.y) {
    var x = ((game.cycle1.x + game.cycle2.x) / 2) + (game.cycle1.w / 2);
    var y = ((game.cycle1.y + game.cycle2.y) / 2) + (game.cycle1.h / 2);

    explode(x, y, color);
  }
}

function crashTrails(x, y, w, h, color) {
  game.trails.forEach(function(trail) {
    if (x < trail.x + trail.w && 
      x + w > trail.x &&
      y < trail.y + trail.h &&
      h + y > trail.y) {
      x += 5;
      y += 5;
      explode(x, y, color);
    }     
  });
}

function crashDisks(x, y, w, h, color) {
  game.disks.forEach(function(disk) {
    if (x < disk.x + disk.w && 
    x + w > disk.x &&
    y < disk.y + disk.h &&
    h + y > disk.y) {
      x += 5;
      y += 5;
      explode(x, y, color);
    }     
  });
}

//animate explosion
function explode(x, y, color) {
  var i = 1;
  var radius = i;
  var explodeColor = "rgb(255, 0, 0)";
  var delay = 10;
  var opacity = 0.1 - (radius / 100);

  game.on = false;
  function explosionLoop () {
    setTimeout(function () { 
      ctx.globalAlpha = opacity;
      ctx.fillStyle = explodeColor;
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
        explodeColor = "rgb(255, 255, 0)";
        explosionLoop();
      } else if (i > 100 && i <= 200) {
        i += 0.5;
        radius = i - 100;
        explodeColor = "rgb(112, 140, 152)";
        explosionLoop();
      } else if (i > 200 && i < 2200) {
        i = i + 10;
        radius = i - 150;
        explodeColor = "rgb(0, 0, 0)";
        delay = 0;
        opacity = 1;
        explosionLoop();
      }
    }, delay);
  } 
  explosionLoop();
  end(color);
}

function setupLevel() {
  game.gameLevel++;
  game.resetCycles();
  game.resetTrails();
  game.resetDisks();
  drawBackground();
  if (game.gameLevel !== 1) {
    drawObstacles(110, 110);
    drawObstacles(110, 510);
    drawObstacles(310, 310);
    drawObstacles(510, 510);
    drawObstacles(510, 110);
    game.createObstacles(110, 110);
    game.createObstacles(110, 510);
    game.createObstacles(310, 310);
    game.createObstacles(510, 510);
    game.createObstacles(510, 110);
  }
  game.on = !game.on;
  startGame();
  loop();        
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
  // draw gradient
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
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      ctx.fillRect(x, y, 10, 10);
      x += 10;
    }
    x -= 40;
    y += 10;
  }
  //draw a 10x10 cross
  x -= 30;
  y -= 30;
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 10; j++) { 
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
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 10; j++) {
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
  for (i = 0; i < 2; i++) {
    for (j = 0; j < 2; j++) {
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

function startGame() {
  gameText[0].innerText = '';
  gameText[1].innerText = '';
  gameText[2].innerText = '';
}

function end(color) {
  var gameText = document.querySelectorAll('.game-text');
  var roundWinner;
  var battleWinner;
  var gameLevel = 0;

  game.levelStarted = false;
  if (color === 'red') {
    roundWinner = 2;
    p2Scores.push(gameLevel);
  } else {
    roundWinner = 1;
    p1Scores.push(gameLevel);
  }
  if (gameLevel === 1) {
    gameText[0].innerText = 'Round ' + gameLevel +
     ' is over. \n \n \n Player ' + roundWinner + 
     ' wins this round. \n \n ';
    gameText[1].innerText = ['In Round 2, you must avoid additional ',
      'obstacles placed throughout the arena. \n \n \n \n'].join('');
    gameText[2].innerText = 'Press the Enter Key to Enter the Grid';
  } else if (gameLevel === 2) {
    gameText[0].innerText = 'Round ' + gameLevel + 
      ' is over. \n \n \n Player ' + roundWinner + ' wins this round. \n \n ';
    gameText[1].innerText = ['In Round 3, you must avoid the discs flying ',
      'throughout the arena. \n \n \n \n'].join('');
    gameText[2].innerText = 'Press the Enter Key to Enter the Grid';
    gameText[3].setTimeout(function() {
      gameText[3].addClass(fade).innerText = 'LOADING... Please wait';
      $('*').off('keyup keydown keypress');
    }, 3000);
  } else {
    var p1unique = p1Scores.filter(onlyUnique);
    var p2unique = p2Scores.filter(onlyUnique);
  }
  if (p1unique.length > p2unique.length) {
    battleWinner = 1;
  } else {
    battleWinner = 2;
  }
  gameText[0].innerText = 'GAME OVER \n \n \n Player ' + roundWinner + 
    ' wins this round. \n \n ';
  gameText[1].innerText = 'Congratulations, Player ' + 
    battleWinner + '.  You have won the battle. \n \n \n \n';
  gameText[2].innerText = 'Press Enter to Restart Game'; 
  gameLevel = 0; 
  p1Scores = [];
  p2Scores = [];
}

//filter scores arrays to include unique values only
function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

// listen for key press
window.addEventListener('keydown', turn);

// evaluate key press and turn cycle
function turn(e) {
  if (e.keyCode === 87 && 
    game.cycle1.direction !== 90) { //w
    game.cycle1.direction = 270;
  } else if (e.keyCode === 83 && 
    game.cycle1.direction !== 270) { //s
    game.cycle1.direction = 90;
  } else if (e.keyCode === 65 && 
    game.cycle1.direction !== 0) { //a
    game.cycle1.direction = 180; 
  } else if (e.keyCode === 68 && 
    game.cycle1.direction !== 180) { //d
    game.cycle1.direction = 0; 
  } else if (e.keyCode === 38 && 
    game.cycle2.direction !== 90) { //up-arrow
    game.cycle2.direction = 270; 
  } else if (e.keyCode === 40 && 
    game.cycle2.direction !== 270) { //down-arrow
    game.cycle2.direction = 90; 
  } else if (e.keyCode === 37 && 
    game.cycle2.direction !== 0) { //left-arrow
    game.cycle2.direction = 180;
  } else if (e.keyCode === 39 && 
    game.cycle2.direction !== 180) { //right-arrow
    game.cycle2.direction = 0;
  }
}