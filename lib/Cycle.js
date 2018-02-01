class Cycle {
  constructor(x, y, w, h, direction, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.direction = direction;
    this.color = color;
    this.lightCycle = '../game-images/cycle1-right.png';
  }

  erase(ctx) {
    ctx.clearRect(this.x, this.y, this.w, this.h);
    return this;
  }

  drawCycle(ctx) {
    var cycle = new Image();
    if (this.direction === 0 && this.color === 'red') {
      cycle.src = '../game-images/cycle1-right.png';
    } else if (this.direction === 270 && this.color === 'red') {
      cycle.src = '../game-images/cycle1-up.png';
    } else if (this.direction === 90 && this.color === 'red') {
      cycle.src = '../game-images/cycle1-down.png'
    } else if (this.direction === 180 && this.color === 'red') {
      cycle.src = '../game-images/cycle1-left.png'
    } else if (this.direction === 270 && this.color === 'blue') {
      cycle.src = '../game-images/cycle2-up.png'
    } else if (this.direction === 90 && this.color === 'blue') {
      cycle.src = '../game-images/cycle2-down.png'
    } else if (this.direction === 180 && this.color === 'blue') {
      cycle.src = '../game-images/cycle2-left.png'
    } else if (this.direction === 0 && this.color === 'blue') {
      cycle.src = '../game-images/cycle2-right.png';
    }
    ctx.drawImage(cycle, this.x - 20, this.y - 20, 30, 30);
    return this;
  }

  move() {
    var radians = this.direction * Math.PI / 180; 
    this.x = Math.floor(this.x + Math.cos(radians));
    this.y = Math.floor(this.y + Math.sin(radians));
    return this;
  }

  drawTrail(ctx) {
    if(this.color === 'red') {
      var mainColor = 'rgba(255, 220, 220, 1)';
      var tintColor = 'rgba(255, 110, 100, 0.7)';
      var shadowColor = 'rgba(255, 110, 100, 0.7)';
    } else {
      var mainColor = 'rgba(255, 220, 220, 1)';
      var tintColor = 'rgba(0, 191, 255, 0.7)';
      var shadowColor = 'rgba(110, 100, 255, 0.7)';
    }
    if(this.direction === 0 || this.direction === 180) {
      // draw horizontal trail
      var x = this.x;
      var y = this.y - 2;
      var gradient = ctx.createLinearGradient(x + 0, y + 0, x + 0, y + 3);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 0, y - 10, 10, 4);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 0, y - 6 , 10, 2);
      ctx.fillStyle = mainColor;
      ctx.fillRect(x + 0, y - 4, 10, 2);
      ctx.fillStyle = tintColor;
      ctx.fillRect(x + 0, y - 2, 10, 2);
      gradient = ctx.createLinearGradient(x + 0, y + 12, x + 0, y + 14);
      gradient.addColorStop(0, shadowColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 0, y, 10, 4);
    } else {
       // draw vertical trail
      var x = this.x - 2;
      var y = this.y;
      var gradient = ctx.createLinearGradient(x + 0, y + 0, x + 3, y + 0);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, shadowColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(x+ 0, y + 0, 4, 10);
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

  


// var lightCycle1 = new Light1();

// lightCycle1.src = "../cycle1-sprite.png";

// var light = sprite({

//   context: canvas.getContext('2d'),
//   w: 100,
//   h: 100,
//   img: lightCycle1
// });
// light.render();

  // sprite(options) {
  //   var that = {};
  //     that.context = options.context;
  //     that.w = options.w;
  //     that.h = options.h;
  //     that.img = options.img;

  //     that.render = function () {

  //       // Draw the animation
  //       that.context.drawImage(
  //          that.img,
  //          0,
  //          0,
  //          that.w,
  //          that.h,
  //          0,
  //          0,
  //          that.w,
  //          that.h);
  //   };
  //     return that;
  // }
}

module.exports = Cycle;