const Gamepieces = require('./Gamepieces.js');

class Disk extends Gamepieces {
  constructor(x, y, w = 10, h = 10, color) {
    super(x, y, w, h, color);
  }
}

module.exports = Disk;