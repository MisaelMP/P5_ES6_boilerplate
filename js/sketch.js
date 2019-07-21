import P5 from 'p5';
import Steering from './steering.js';


global.P$ = new P5(function drawSteering(p) {

	let font;
	let steerings = [];

	p.preload = function() {
		font = p.loadFont('fonts/Aleo-Bold.otf');
	}

	p.setup = function() {
		p.createCanvas(p.windowWidth, p.windowHeight);
		p.background(51);

		let points = font.textToPoints('Isabel', p.windowWidth / 2.9, p.windowHeight / 2, 128, {
			sampleFactor: 0.25
		});

		for (let dot of points) {
			let pt = dot
			let steering = new Steering(pt.x, pt.y);
			steerings.push(steering);
			// stroke(255);
			// strokeWeight(8);
			// point(pt.x, pt.y);
		}
	}

	p.draw = function() {
		p.background(51);
		for (let s of steerings) {
			let v = s
			v.behaviors();
			v.update();
			v.show();
		}

		// p.textFont(font);
		// p.textSize(192);
		// p.fill(255);
		// p.noStroke();
		// p.text('sometext', 100, 200);
	}

	p.windowResized = function() {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	}
});
