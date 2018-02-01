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
      this.drawHorizontalTrail();
    } else {
      this.drawVerticalTrail();
    }
    return this;
  }

  drawHorizontalTrail() {
    var x = this.x;
      var y = this.y - 2;
      var gradient = ctx.createLinearGradient(x, y, x, y + 3);

      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, 10, 4);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x, y + 4, 10, 2);
      ctx.fillStyle = mainColor;
      ctx.fillRect(x, y + 6, 10, 2);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x, y + 8, 10, 2);
      gradient = ctx.createLinearGradient(x, y + 12, x, y + 14);
      gradient.addColorStop(0, shadowColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y + 10, 10, 4);
  }

  drawVerticalTrail() {
    x = this.x - 2;
      y = this.y;
      gradient = ctx.createLinearGradient(x, y, x + 3, y);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, 4, 10);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 4, y, 2, 10);
      ctx.fillStyle = mainColor;
      ctx.fillRect(x + 6, y, 2, 10);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 8, y, 2, 10);
      gradient = ctx.createLinearGradient(x + 12, y, x + 14, y);
      gradient.addColorStop(0, shadowColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 10, y, 4, 10);     
  }
}

module.exports = Cycle;