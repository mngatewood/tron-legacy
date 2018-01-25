class Cycle {
  constructor(x, y, w, h, direction) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.direction = direction;
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.w, this.h);
    return this;
  }
  
  drawTrail(ctx) {
    ctx.fillStyle = "rgb(0, 0, 255)";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    return this;
  }

  move() {
    var radians = this.direction * Math.PI / 180; 
     
    this.x = Math.floor(this.x + Math.cos(radians));
    this.y = Math.floor(this.y + Math.sin(radians));
    return this;
  }

  draw(ctx) {
    ctx.fillStyle = "rgb(250, 0, 0)";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    return this;
  }

  
}

module.exports = Cycle;