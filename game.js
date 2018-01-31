class Game {
  constructor(color) {
//cycle collision detection
  this.color = color;
 }

  crashCycles() {
  if (cycle1.x < cycle2.x + cycle2.w && 
    cycle1.x + cycle1.w > cycle2.x &&
    cycle1.y < cycle2.y + cycle2.h &&
    cycle1.h + cycle1.y > cycle2.y) {
    var x = ((cycle1.x + cycle2.x) / 2) + (cycle1.w / 2);
    var y = ((cycle1.y + cycle2.y) / 2) + (cycle1.h / 2);

    explode(x, y);
    gameOn = false;
    endGame();
    }
  }

}

module.exports = Game;