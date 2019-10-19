let w = 0, h = 0, t = 0, angle = 0;
var  xPos = -1;
var  yPos = -1;

//this is image load for the first scene
const personStrip = new Image();
const background = new Image();
const chairBack = new Image();
const textImage = new Image();
const clock = new Image();
const clockm = new Image();
const clockh = new Image();

//This loads the image for the 3rd scene
const background3 = new Image();

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

    personStrip.src = "person.png";
    background.src = "background.png";
	chairBack.src = "chairBack.png";
	textImage.src = "text.png";
	clock.src = "clock.png";
	clockm.src = "minuteHand.png";
	clockh.src = "hourHand.png";
	background3.src = "background3.png"
    
    window.requestAnimationFrame(redraw);
	
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
	
	//Render the gradient
	context.fillStyle = sky(t/900);
	context.beginPath();
	context.rect(0,0, 1920, 1080);
	context.fill();
	
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
	context.restore();+
	
	/*(This is for the second part)
	//Draw Background
	context.drawImage(background3, 0, 0);


	//draw the comet behind the mountain
	for (var i = 0; i < positions.length; i++) {
		var ratio = (i + 1) / positions.length;
		
		context.beginPath();
		context.arc(positions[i].x, positions[i].y, 10, 0, 2 * Math.PI, true);
		context.fillStyle = "rgba(200, 200, 200, " + ratio / 2 + ")";
		context.fill();
	}
	
	context.beginPath();
	context.arc(xPos, yPos, 10, 0, 2 * Math.PI, true);
	context.fillStyle = "#AAAAAA";
	context.fill();
	
	storeLastPosition(xPos, yPos);
	
	// update position
	if (xPos > 1920) {
		xPos = -100;
	}
	if (yPos > 1080) {
		yPos = -100;
	}
	yPos += 2;
	xPos += 3;
	*/
	
	
	t++;
	window.requestAnimationFrame(redraw);
}

//THis is the positions storage for the second part
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

//The changing sky for the first part
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
