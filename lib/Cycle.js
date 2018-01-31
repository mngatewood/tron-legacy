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