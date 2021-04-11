function Snake() {
	this.x = 0;
	this.y = 0;
	this.ySpeed = 0;
	this.xSpeed = 1;
	this.total = 0;
	this.tail = [];

	this.dir = function(x, y) {
		this.xSpeed = x;
		this.ySpeed = y;
	}

	this.eat = function(pos) {
		var d = dist(this.x, this.y, pos.x, pos.y);

		if (d < 1) {
			this.total++;
			return true;
		}
		else {
			return false;
		}
	}

	this.die = function() {
		for (var i = 0; i < this.tail.length; i++) {
			var pos = this.tail[i];
			d = dist(this.x, this.y, pos.x, pos.y);
			if (d < 1) {
				console.log("Game Over");
				this.total = 0;
				this.tail = [];
			}
		}
	}

	this.update = function () {

		if (this.total === this.tail.length) {
			for (var i = 0; i < (this.tail.length - 1); i++) {
				this.tail[i]  = this.tail[i + 1];
			}
		}
		this.tail[this.total - 1] = createVector(this.x, this.y);

		this.x += this.xSpeed * cell;
		this.y += this.ySpeed * cell;

		this.x = constrain(this.x, 0, (width-cell));
		this.y = constrain(this.y, 0, (height-cell));

	};

	this.show = function () {
		fill(255);
		for (var i = 0; i < (this.total); i++) {
			rect(this.tail[i].x, this.tail[i].y, cell, cell);
		}
		fill(0, 255, 0);
		rect(this.x, this.y, cell, cell);
	}
}
