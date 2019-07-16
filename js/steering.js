import P5 from 'p5';

export default class Steering {

	constructor(x, y) {
		this.pos = P$.createVector(P$.random(P$.width), P$.random(P$.height));
		this.target = P$.createVector(x, y);
		this.vel = P5.Vector.random2D();
		this.acc = P$.createVector();
		this.r = 2;
		this.maxspeed = 10;
		this.maxforce = 1;
	}

	behaviors() {
		let arrive = this.arrive(this.target);
		let mouse = P$.createVector(P$.mouseX, P$.mouseY);
		let flee = this.flee(mouse);

		arrive.mult(1);
		flee.mult(5);

		this.applyForce(arrive);
		this.applyForce(flee);
	}

	applyForce(f) {
		this.acc.add(f);
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.mult(0);
	}

	show() {
		P$.stroke(255);
		P$.strokeWeight(this.r);
		P$.point(this.pos.x, this.pos.y);
	}

	arrive(target) {
		let desired = P5.Vector.sub(target, this.pos);
		let d = desired.mag();
		let speed = this.maxspeed;
		if (d < 100) {
			speed = P$.map(d, 0, 100, 0, this.maxspeed);
		}
		desired.setMag(speed);
		let steer = P5.Vector.sub(desired, this.vel);
		steer.limit(this.maxforce);
		return steer;
	}

	flee(target) {
		let desired = P5.Vector.sub(target, this.pos);
		let d = desired.mag();
		if (d < 50) {
			desired.setMag(this.maxspeed);
			desired.mult(-1);
			let steer = P5.Vector.sub(desired, this.vel);
			steer.limit(this.maxforce);
			return steer;
		} else {
			return P$.createVector(0, 0);
		}
	}
}
