// Directions Model = https://teachablemachine.withgoogle.com/models/MiVegC6qs/
// Face Recognition Model =  https://teachablemachine.withgoogle.com/models/LkdOPPcSc/

// Pose Detection Model = https://teachablemachine.withgoogle.com/models/9Ehn9mYY7/

// Arrow Detection Moel = https://teachablemachine.withgoogle.com/models/nVndYPUwZ/

// Video
let video;
let classifier;
let label = "waiting...";

var s;
var cell = 20;
var food;

// STEP 1: Load the model!
function preload() {
	classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nVndYPUwZ/model.json');
}

function setup() {
	createCanvas(640, 480);
	// Create the video
	video = createCapture(VIDEO);
	video.hide();
	// STEP 2: Start classifying
	classifyVideo();

	s = new Snake();
	frameRate(10);
	pickLocation();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function pickLocation() {
	var cols = floor(width / cell);
	var rows = floor(height / cell);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(cell);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSnake();
  classifyVideo();
}

function draw() {
	background(51);

	image(video, 0, 0);
	textSize(32);
	text(label, 10, 50);
	fill(255);

	s.die();
	s.update();
	s.show();

	if (s.eat(food)) {
		pickLocation();
	}

	fill(255, 0, 0);
	rect(food.x, food.y, cell, cell);
}

function controlSnake() {
	if (label === "UP") {
		s.dir(0, -1);
	}
	else if (label === "DOWN") {
		s.dir(0, 1);
	}
	else if (label === "RIGHT") {
		s.dir(1, 0);
	}
	else if (label === "LEFT") {
		s.dir(-1, 0);
	}
	// if (keyCode === UP_ARROW) {
	// 	s.dir(0, -1);
	// }
	// else if (keyCode === DOWN_ARROW) {
	// 	s.dir(0, 1);
	// }
	// else if (keyCode === RIGHT_ARROW) {
	// 	s.dir(1, 0);
	// }
	// else if (keyCode === LEFT_ARROW) {
	// 	s.dir(-1, 0);
	// }
}

