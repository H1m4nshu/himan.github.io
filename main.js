let w = 0, h = 0, t = 0, angle = 0, cx = 0, c1x = -1920, transition = 0, balls = [], animating = false, ly = -1320, lx = -2220, l2y = -1320;
var xPos = -1;
var yPos = -1;
var xPos1 = 900;
var yPos1 = -500;
var xPos2 = 1800;
var yPos2 = -200;
//this is image load for the first scene
const personStrip = new Image();
const background = new Image();
const chairBack = new Image();
const textImage = new Image();
const clock = new Image();
const clockm = new Image();
const clockh = new Image();
const cloud = new Image();
const loading = new Image();
//Loading image for the second scene
const safety = new Image();
const asteroid = new Image();
const background2 = new Image();
const loading2 = new Image();
const message = new Image();

//This loads the image for the 3rd scene
const background3 = new Image();
const person = new Image();
const hills = new Image();
const mountains = new Image();
const clouds = new Image();
const loading3 = new Image();

//This is the functioln to set the canvas width and height
function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('mainCanvas');
    canvas.width = w;
    canvas.height = h;
}

//initialisation of the page
function pageLoad() {

    window.addEventListener("resize", fixSize);
    fixSize();
	
	//First scene source images
    personStrip.src = "person.png";
    background.src = "background.png";
	chairBack.src = "chairBack.png";
	textImage.src = "text.png";
	clock.src = "clock.png";
	clockm.src = "minuteHand.png";
	clockh.src = "hourHand.png";
	cloud.src = "cloud.png";
	loading.src = "loading.png";
	//second scene
	safety.src = "safety.png";
	asteroid.src = "asteroid.png";
	background2.src = "background2.png";
	loading2.src = "loading2.png";
	message.src = "message.png";
	//3rd scence source images
	background3.src = "bruhmoment3.png";
	person.src = "layer1.png";
	hills.src = "layer2.png";
	mountains.src = "layer3.png";
	clouds.src = "cloud2.png";
	loading3.src = "loading3.png";
	
	for (let i = 0; i < 50; i++){
		let x = Math.random() * w;
		let y = Math.random() * 770;
		let dx = Math.random() * 200 - 100;
		let dy = Math.random() * 200 - 100;
		let r = Math.random() * 30 + 20;
		balls.push({x, y, dx, dy, r});
	}
    
    window.requestAnimationFrame(redraw);
	window.addEventListener('click', () => {if (animating == false){transition+=1;} console.log(transition);});
	
}


//redraw function
let lastTimestamp = 0;
let frameS =0;

function redraw(timestamp) {
	const canvas = document.getElementById('mainCanvas');
    const context = canvas.getContext('2d');
	angle += Math.PI/100;
	
	if (lastTimestamp === 0) lastTimestamp = timestamp;
    const frameLength = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;
	
	if (transition == 0 || transition == 1) {
		if (transition == 1){
			animating = true;
		}
		
		//Render the gradient
		context.fillStyle = sky(t/900);
		context.beginPath();
		context.rect(0,0, 1920, 1080);
		context.fill();
		
		//Draw the cloud
		context.drawImage(cloud, ((t*5)%1920), 400);
		
		//Draw Background
		context.drawImage(background, 0, 0);
		
		//Draw Character
		if (t%40 == 0) {frameS++;}
		context.drawImage(personStrip, (personStrip.width/4)*(frameS%4), 0, personStrip.width/4, personStrip.height, 1370, 612, personStrip.width/4, personStrip.height);
		
		//Draw the back of the chair
		context.drawImage(chairBack, 1360, 840);
		
		//Draw the text
		context.drawImage(textImage, 1400, 260+(15*(frameS%2)))
		
		//Draw the clock
		context.drawImage(clock, 1280, 8);
		
		//Draw the hands
		context.save();
		context.translate(1392, 135);
		context.rotate(angle/1);
		context.drawImage(clockm, -clockm.width/2, -clockm.height);
		context.restore();
		context.save();
		context.translate(1392, 135);
		context.rotate(angle/(4*Math.PI));
		context.drawImage(clockh, -clockh.width/2, -clockh.height);
		context.restore();
		if (transition == 1) {
			context.drawImage(loading, 0, ly);
			ly += 11;
		}
		if (ly >= 11){
				l2y = -1320;
				animating=false;
				transition = 2;
		}
	}else if (transition == 2 || transition == 3){
		if (transition == 3){
			animating = true;
		}
		
		//Draw the background
		context.drawImage(background2, 0, 0);
		//Draw the safety
		context.drawImage(safety, 1660,780);
		//Draw the asteroid
		for (let b of balls) {

			b.x += b.dx * frameLength;
			b.y += b.dy * frameLength;

			if (b.x < -b.r && b.dx < 0) {
				b.x += w+2*b.r;
				//b.dx = 0;
			}
			if (b.y < -b.r && b.dy < 0) {
				b.y += h+2*b.r;
				//b.dy = 0;
			}
			if (b.x > w+b.r && b.dx > 0) {
				b.x -= w+2*b.r;
				//b.dx = 0;
			}
			if (b.y > h+b.r && b.dy > 0) {
				b.y -= h+2*b.r;
				//b.dy = 0;
			}
		}
		function separation(b1, b2) {
			return Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2));
		}
		
		for (let i = 1; i < balls.length; i++) {
			for (let j = 0; j < i; j++) {

				const b1 = balls[i];
				const b2 = balls[j];

				const s = separation(b1, b2);
				const overlap = b1.r + b2.r - s;

				if (overlap > 0) {
					const unitX = (b1.x - b2.x) / s;
					const unitY = (b1.y - b2.y) / s;

					b1.x += unitX * overlap / 2;
					b1.y += unitY * overlap / 2;
					b2.x -= unitX * overlap / 2;
					b2.y -= unitY * overlap / 2;

					const dotProduct1 = b1.dx * unitX + b1.dy * unitY;
					const dotProduct2 = b2.dx * unitX + b2.dy * unitY;

					b1.dx = -unitX * dotProduct1;
					b1.dy = -unitY * dotProduct1;
					b2.dx = -unitX * dotProduct2;
					b2.dy = -unitY * dotProduct2;
				}
			}
		}
		
		for (let b of balls) {
			if (b.x > 1660 && b.y > 780){
				b.dx = -b.dx;
				b.dy = -b.dy;
			}
		}
		
		for (let b of balls){ 
			context.drawImage(asteroid, 0,0, asteroid.width, asteroid.height, b.x-b.r, b.y-b.r, b.r*2, b.r*2);
		}
		context.drawImage(message, 40, 1000);
		if (transition == 3) {
			context.drawImage(loading2, lx, 0 );
			lx += 10;
		}
		if (lx > 20){
				ly = -1320;
				animating=false;
				transition = 4;
		}
	}else if (transition == 4 || transition == 5) {
		if (transition == 5){
			animating = true;
		}
		
		//Draw Background
		context.drawImage(background3, 0, 0);


		//draw the comet behind the mountain
		comet(xPos, yPos);
		
		//Draw Mountains
		context.drawImage(mountains, 0, 0);
		
		//draw comet infromt of the moutain
		comet1();
		
		//Draw Hills
		context.drawImage(hills, 0, 0);

		
		//Draw the front layer
		context.drawImage(person, 0, 0);
		
		//Draw the clouds
		if (cx > 1920) {cx = -1920;}
		context.drawImage(clouds, cx, 0);
		if (c1x > 1920) {c1x = -1920;}
		context.drawImage(clouds, c1x, 0);
		cx += 2;
		c1x += 2;
		
		context.drawImage(message, 1500, 1030);
		if (transition == 5) {
			context.drawImage(loading3, 0, l2y);
			l2y += 11;
		}
		if (l2y >= 11){
				lx = -2220;
				animating=false;
				transition = 0;
		}
	}
	t++;
	window.requestAnimationFrame(redraw);
}

function comet(){
	const canvas = document.getElementById('mainCanvas');
    const context = canvas.getContext('2d');
	
	for (var i = 0; i < positions.length; i++) {
		var ratio = (i + 1) / positions.length;
		
		context.beginPath();
		context.arc(positions[i].x, positions[i].y, 10, 0, 2 * Math.PI, true);
		context.fillStyle = "rgba(200, 200, 230, " + ratio / 2 + ")";
		context.fill();
	}
	
	context.beginPath();
	context.arc(xPos, yPos, 10, 0, 2 * Math.PI, true);
	context.fillStyle = "#AAAAAC";
	context.fill();
	
	storeLastPosition(xPos, yPos);
	
	// update position
	if (yPos > 1080|| xPos > 1920) {
		yPos = -100;
		xPos = Math.random()*1920;
	}
	yPos += 2;
	xPos += 2.5;
}

var motionTrailLength = 50;
var positions = [];
 
function storeLastPosition(xPos, yPos) {
  // push an item
  positions.push({
    x: xPos,
    y: yPos
  });
 
  //get rid of first item
  if (positions.length > motionTrailLength) {
    positions.shift();
  }
}

function comet1(){
	const canvas = document.getElementById('mainCanvas');
    const context = canvas.getContext('2d');
	
	for (var i = 0; i < positions1.length; i++) {
		var ratio1 = (i + 1) / positions1.length;
		
		context.beginPath();
		context.arc(positions1[i].x, positions1[i].y, 10, 0, 2 * Math.PI, true);
		context.fillStyle = "rgba(200, 200, 200, " + ratio1 / 2 + ")";
		context.fill();
	}
	
	context.beginPath();
	context.arc(xPos1, yPos1, 10, 0, 2 * Math.PI, true);
	context.fillStyle = "#AAAAAA";
	context.fill();
	
	storeLastPosition1(xPos1, yPos1);
	
	// update position
	if (yPos1 > 1080 || xPos1 > 1920) {
		yPos1 = -100;
		xPos1 = Math.random()*1920;
	}
	yPos1 += 2.5;
	xPos1 += 3;
}

var motionTrailLength1 = 60;
var positions1 = [];
 
function storeLastPosition1(xPos1, yPos1) {
  // push an item
  positions1.push({
    x: xPos1,
    y: yPos1
  });
 
  //get rid of first item
  if (positions1.length > motionTrailLength1) {
    positions1.shift();
  }
}

function sky(c) {
	c = Math.abs(c) % 6;
	if (c < 1) {
		return `rgb(${40+(c*33)}, ${44+(c*34)}, ${81+(c*35)})`;
	} if (c < 2) {
		return `rgb(${73-((c-1)*9)}, ${78+((c-1)*60)}, ${116+((c-1)*97)})`;
	} if (c < 3) {
		return `rgb(${64+((c-2)*19)}, ${138+((c-2)*23)}, ${213+((c-2)*10)})`;
	} if (c < 4) {
		return `rgb(${83+((c-3)*22)}, ${161-((c-3)*109)}, ${223-((c-3)*153)})`;
	} if (c < 5) {
		return `rgb(${105-((c-4)*73)}, ${52-((c-4)*34)}, ${70-((c-4)*35)})`;
	} else {
		return `rgb(${32+((c-5)*8)}, ${18+((c-5)*26)}, ${35+((c-5)*46)})`;
	}
}