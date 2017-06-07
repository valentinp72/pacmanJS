const SIZE_DOT = 20;
const MAP_H = 20;
const MAP_W = 30;
const HEIGHT   = MAP_H * SIZE_DOT;
const WIDTH    = MAP_W * SIZE_DOT;

let map = create2DArray(MAP_H, MAP_W, 0);

function setup(){
	createCanvas(WIDTH, HEIGHT);
	background(51);

	frameRate(15);

}

function draw(){

	mouseCheck();
	drawMap();
}

function mousePressed() {



	if(mouseButton == CENTER){
		print(JSON.stringify(map));
	}

	return false;
}

function mouseCheck(){

	this.realLocation = function(n){
		return int(n / SIZE_DOT);
	}

	this.isValidLocation = function(x, y){
		return x >= 0 && x < MAP_W && y >= 0 && y < MAP_H;
	}

	if(mouseIsPressed){
		var xPos = this.realLocation(mouseX);
		var yPos = this.realLocation(mouseY);

		if(this.isValidLocation(xPos, yPos)){
			if(mouseButton == LEFT){
				map[yPos][xPos] = 1;
			}
			else if(mouseButton == RIGHT){
				map[yPos][xPos] = 0;
			}
		}
	}
}

function showGrid(){
	fill(0);
	var tmp;

	// Vertical lines
	for(var i = 0 ; i < MAP_W ; i++) {
		tmp = i * SIZE_DOT;
		line(tmp, 0, tmp, HEIGHT);
	}

	// Horizontal lines
	for(var i = 0 ; i < MAP_W ; i++) {
		tmp = i * SIZE_DOT;
		line(0, tmp, WIDTH, tmp);
	}
}

function drawMap(){
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

function create2DArray(rows, cols, value){
	var array = [];

	while(rows--){
		array.push(new Array(cols).fill(value));
	}

	return array;
}
