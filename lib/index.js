
var Cycle = require('./Cycle.js');


var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var cycles = [cycle1, cycle2];
var cycle1 = new Cycle(0, 345, 10, 10);
var cycle2 = new Cycle(690, 345, 10, 10);


var gameOn = false;
document.body.onkeydown = function(e) {
		if(e.keyCode === 32) {
			gameOn = !gameOn;
			requestAnimationFrame(loop);				
		}
}

function loop() {
	if(gameOn === true) {
		console.log(gameOn);
		cycles.forEach(function(cycle){
			cycle1.erase(ctx).drawTrail(ctx).move().draw(ctx);
			cycle2.erase(ctx).drawTrail(ctx).move().draw(ctx);
		});
	requestAnimationFrame(loop);
	};
};
requestAnimationFrame(loop);				
