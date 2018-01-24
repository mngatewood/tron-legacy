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

	move(this.direction) {
		// var right = 0;
		// var down = 90 * Math.PI / 180;
		// var left = 180 * Math.PI / 180;
		// var up = 270 * Math.PI / 180;
		var radians = direction * Math.PI / 180;  
		this.x = Math.floor(this.x + Math.cos(radians));
		this.y = Math.floor(this.x + Math.sin(radians));
		return this;
	}

	// turn(direction) {
	// 	var right = 0;
	// 	var down = 90 * Math.PI / 180;
	// 	var left = 180 * Math.PI / 180;
	// 	var up = 270 * Math.PI / 180;
	// 	this.x = Math.floor(this.x + Math.cos(direction));
	// 	this.y = Math.floor(this.x + Math.sin(direction));
	// 	return this;
	// }

	draw(ctx) {
		ctx.fillStyle = "rgb(250, 0, 0)";
		ctx.fillRect(this.x, this.y, this.w, this.h);
		return this;
	}

	drawTrail(ctx) {
		ctx.fillStyle = "rgb(0, 0, 255)";
		ctx.fillRect(this.x, this.y, this.w, this.h);
		return this;
	}

	// up(e){
	// 	if(e.keyCode === 38) {

	// 	}
	// }

}

module.exports = Cycle;