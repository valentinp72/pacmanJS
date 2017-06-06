const SIZE_DOT = 20;
const MAP_H = 18;
const MAP_W = 25;
const HEIGHT   = MAP_H * SIZE_DOT;
const WIDTH    = MAP_W * SIZE_DOT;


const MAP_LVL_1 = [
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	[0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0],
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
	[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1]
];
const map = MAP_LVL_1;


let pacman;

function drawMap(map){
	for(var i = 0; i < map.length; i++){
		for(var j = 0; j < map[i].length; j++){
			if(map[i][j] === 0)
				fill(51);
			else {
				fill(color(68, 108, 179));
			}
			rect(j * SIZE_DOT, i * SIZE_DOT, SIZE_DOT, SIZE_DOT);
		}
	}
}

function setup(){
	createCanvas(WIDTH, HEIGHT);
	//noStroke();
	frameRate(8);
	angleMode(DEGREES);


	background(51);

	pacman = new PacMan();
}

function draw(){

	drawMap(map);

	pacman.checkPlayer();
	pacman.update();
	pacman.display();
}

function PacMan(){
	this.x = 1;
	this.y = 2;
	this.yVel = 0;
	this.xVel = 0;
	this.angle = 30;
	this.angleDir = 50;

	this.checkPlayer = function(){
		if(keyIsDown(UP_ARROW)){
			this.yVel = -1;
			this.xVel = 0;
		}
		else if(keyIsDown(DOWN_ARROW)){
			this.yVel = 1;
			this.xVel = 0;
		}
		else if(keyIsDown(LEFT_ARROW)){
			this.yVel = 0;
			this.xVel = -1;
		}
		else if(keyIsDown(RIGHT_ARROW)){
			this.yVel = 0;
			this.xVel = 1;
		}
	}

	this.isValidPos = function(x, y){
		if(x >= 0 && x < MAP_W && y >= 0 && y < MAP_H && map[y][x] == 0){
			return true;
		}
		return false;
	}

	this.update = function(){

		if(this.xVel != 0 || this.yVel != 0){

			var nextX = this.x + this.xVel;
			var nextY = this.y + this.yVel;

			if(this.isValidPos(nextX, nextY)){
				this.x = nextX;
				this.y = nextY;
			}
			else {
				this.xVel = 0;
				this.yVel = 0;
			}
		}

	}

	this.display = function(){
		fill('yellow');

		var xPos = (this.x + 1) * SIZE_DOT - (SIZE_DOT/2);
		var yPos = (this.y + 1) * SIZE_DOT - (SIZE_DOT/2);

  		arc(xPos, yPos, SIZE_DOT, SIZE_DOT, this.angle/2, 360 - this.angle/2, PIE);

		this.angle += this.angleDir;
		if(this.angle >= 90 || this.angle <= 30){
			this.angleDir = - this.angleDir;
		}
	}
}
