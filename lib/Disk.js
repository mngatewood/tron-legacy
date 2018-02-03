const Gamepieces = require('./Gamepieces.js');

class Disk extends Gamepieces {
  constructor(x, y, w = 10, h = 10, direction, color) {
    super(x, y, w, h, direction, color);
  }
}

module.exports = Disk;