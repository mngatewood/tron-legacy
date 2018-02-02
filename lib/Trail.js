var Game = require('./Game.js');

class Trail extends Gamepieces {
  constructor(x, y, w = 10, h = 10) {
    super (x, y, w, h);
  }
}

module.exports = Trail;