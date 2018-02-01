class Cycle {
  constructor(x, y, w, h, direction, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.direction = direction;
    this.color = color;
  }

  //original erase and draw in case of emergency

  // erase(ctx) {
  //   ctx.clearRect(this.x, this.y, this.w, this.h);
  //   return this;
  // }

  // draw(ctx) {
  //   if (this.color === 'red') {
  //     ctx.fillStyle = "rgb(250, 0, 0)";
  //   } else {
  //     ctx.fillStyle = "rgb(0, 0, 255)";
  //   }
  //   ctx.fillRect(this.x, this.y, this.w, this.h);
  //   return this;
  // } 

  erase(ctx) {
    if (this.direction === 0) {
      ctx.clearRect(this.x, this.y - 15, this.w, this.h);
    } else if (this.direction === 90) {
      ctx.clearRect(this.x - 5, this.y + 5, this.w - 20, this.h);
    } else if (this.direction === 180) {
      ctx.clearRect(this.x, this.y - 15, this.w, this.h);
    } else if (this.direction === 270) {
      ctx.clearRect(this.x - 5, this.y + 5, this.w - 20, this.h);
    }
    return this;
  }

  drawCycle(ctx) {
    var cycle = new Image();

    if (this.direction === 0 && this.color === 'red') {
      cycle.src = '../game-images/cycle2-right-small.png';
      ctx.drawImage(cycle, this.x, this.y - 15, 40, 20);
    } else if (this.direction === 270 && this.color === 'red') {
      cycle.src = '../game-images/cycle2-up-small.png';
      ctx.drawImage(cycle, this.x - 5, this.y, 20, 40);
    } else if (this.direction === 90 && this.color === 'red') {
      cycle.src = '../game-images/cycle2-down-small.png';
      ctx.drawImage(cycle, this.x - 5, this.y, 20, 40);
    } else if (this.direction === 180 && this.color === 'red') {
      cycle.src = '../game-images/cycle2-left-small.png';
      ctx.drawImage(cycle, this.x, this.y - 15, 40, 20);
    } else if (this.direction === 270 && this.color === 'blue') {
      cycle.src = '../game-images/cycle1-up-small.png';
      ctx.drawImage(cycle, this.x - 5, this.y, 20, 40);
    } else if (this.direction === 90 && this.color === 'blue') {
      cycle.src = '../game-images/cycle1-down-small.png';
      ctx.drawImage(cycle, this.x - 5, this.y, 20, 40);
    } else if (this.direction === 180 && this.color === 'blue') {
      cycle.src = '../game-images/cycle1-left-small.png';
      ctx.drawImage(cycle, this.x, this.y - 15, 40, 20);
    } else if (this.direction === 0 && this.color === 'blue') {
      cycle.src = '../game-images/cycle1-right-small.png';
      ctx.drawImage(cycle, this.x, this.y - 15, 40, 20);
    }
    return this;
  }

  move() {
    var radians = this.direction * Math.PI / 180; 

    this.x = Math.floor(this.x + Math.cos(radians));
    this.y = Math.floor(this.y + Math.sin(radians));
    return this;
  }

  drawTrail(ctx) {
    var mainColor, tintColor, shadowColor;

    if (this.color === 'red') {
      mainColor = 'rgba(255, 220, 220, 1)';
      tintColor = 'rgba(255, 110, 100, 0.7)';
      shadowColor = 'rgba(255, 110, 100, 0.7)';
    } else {
      mainColor = 'rgba(255, 220, 220, 1)';
      tintColor = 'rgba(0, 191, 255, 0.7)';
      shadowColor = 'rgba(110, 100, 255, 0.7)';
    }
    if (this.direction === 0 || this.direction === 180) {
      // draw horizontal trail
      var x = this.x;
      var y = this.y - 2;
      var gradient = ctx.createLinearGradient(x + 0, y + 0, x + 0, y + 3);

      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 0, y + 0, 10, 4);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 0, y + 4, 10, 2);
      ctx.fillStyle = mainColor;
      ctx.fillRect(x + 0, y + 6, 10, 2);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 0, y + 8, 10, 2);
      gradient = ctx.createLinearGradient(x + 0, y + 12, x + 0, y + 14);
      gradient.addColorStop(0, shadowColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 0, y + 10, 10, 4);
    } else {
      // draw vertical trail
      x = this.x - 2;
      y = this.y;
      gradient = ctx.createLinearGradient(x + 0, y + 0, x + 3, y + 0);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 0, y + 0, 4, 10);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 4, y + 0, 2, 10);
      ctx.fillStyle = mainColor;
      ctx.fillRect(x + 6, y + 0, 2, 10);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 8, y + 0, 2, 10);
      gradient = ctx.createLinearGradient(x + 12, y + 0, x + 14, y + 0);
      gradient.addColorStop(0, shadowColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 10, y + 0, 4, 10);     
    }
    return this;
  }
}

module.exports = Cycle;