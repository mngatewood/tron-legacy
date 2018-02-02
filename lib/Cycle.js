const Gamepieces = require('./Game.js');

class Cycle extends Gamepieces {
  constructor(x, y, w, h, direction, color) {
    super (x, y, w, h, direction, color);
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.w, this.h);
    return this;
  }

  draw(ctx) {
    if (this.color === 'red') {
      ctx.fillStyle = "rgb(250, 0, 0)";
    } else {
      ctx.fillStyle = "rgb(0, 0, 255)";
    }
    ctx.fillRect(this.x, this.y, this.w, this.h);
    return this;
  } 

  move() {
    var radians = this.direction * Math.PI / 180; 

    this.x = Math.floor(this.x + Math.cos(radians));
    this.y = Math.floor(this.y + Math.sin(radians));
    return this;
  }

  drawTrail(ctx) {
    var mainColor = 'rgba(255, 220, 220, 1)';
    var tintColor, shadowColor;

    if (this.color === 'red') {
      tintColor = 'rgba(255, 110, 100, 0.7)';
      shadowColor = 'rgba(255, 110, 100, 0.7)';
    } else {
      tintColor = 'rgba(0, 191, 255, 0.7)';
      shadowColor = 'rgba(110, 100, 255, 0.7)';
    }
    if (this.direction === 0 || this.direction === 180) {
      this.drawHorizontalTrail(mainColor, tintColor, shadowColor, ctx);
    } else {
      this.drawVerticalTrail(mainColor, tintColor, shadowColor, ctx);
    }
    return this;
  }

  drawHorizontalTrail(mainColor, tintColor, shadowColor, ctx) {
    var x = this.x;
    var y = this.y - 2;
    var gradientX = ctx.createLinearGradient(x, y, x, y + 3);

    gradientX.addColorStop(0, 'transparent');
    gradientX.addColorStop(1, shadowColor);
    ctx.fillStyle = gradientX;
    ctx.fillRect(x, y, 10, 4);
    ctx.fillStyle = tintColor;
    ctx.fillRect(x, y + 4, 10, 2);
    ctx.fillStyle = mainColor;
    ctx.fillRect(x, y + 6, 10, 2);
    ctx.fillStyle = tintColor;
    ctx.fillRect(x, y + 8, 10, 2);
    gradientX = ctx.createLinearGradient(x, y + 12, x, y + 14);
    gradientX.addColorStop(0, shadowColor);
    gradientX.addColorStop(1, 'transparent');
    ctx.fillStyle = gradientX;
    ctx.fillRect(x, y + 10, 10, 4);
  }

  drawVerticalTrail(mainColor, tintColor, shadowColor, ctx) {
    var x = this.x - 2;
    var y = this.y;
    var gradientY = ctx.createLinearGradient(x, y, x, y + 3);

    gradientY = ctx.createLinearGradient(x, y, x + 3, y);
    gradientY.addColorStop(0, 'transparent');
    gradientY.addColorStop(1, shadowColor);
    ctx.fillStyle = gradientY;
    ctx.fillRect(x, y, 4, 10);
    ctx.fillStyle = tintColor;
    ctx.fillRect(x + 4, y, 2, 10);
    ctx.fillStyle = mainColor;
    ctx.fillRect(x + 6, y, 2, 10);
    ctx.fillStyle = tintColor;
    ctx.fillRect(x + 8, y, 2, 10);
    gradientY = ctx.createLinearGradient(x + 12, y, x + 14, y);
    gradientY.addColorStop(0, shadowColor);
    gradientY.addColorStop(1, 'transparent');
    ctx.fillStyle = gradientY;
    ctx.fillRect(x + 10, y, 4, 10);     
  }
}

module.exports = Cycle;