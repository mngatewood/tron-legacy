class Cycle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	erase(ctx) {
		ctx.clearRect(this.x, this.y, this.w, this.h);
		return this;
	}

	move() {
		this.x++;
		return this;
	}

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


}

module.exports = Cycle;