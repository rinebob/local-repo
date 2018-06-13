'use strict';

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for ( var i = 0; i < arr.length; i++ ) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function getRandomList(cols, rows, totalBees){
	var totalGrid = cols * rows;
	var randomSet = new Set();
	while( randomSet.size < totalBees ){
		var pos = floor(random(totalGrid));
		randomSet.add(pos);
	}
	console.log(randomSet);
	return randomSet;
}

var w = 40;
var cols;
var rows;
var grid;
var totalBees = 10;


function setup() {
	createCanvas(401, 401);
	background(255);
	stroke(0);
	frameRate(10);

	cols = floor( width / w );
	rows = floor( height / w );
	grid = make2DArray(cols, rows);


	for ( var i = 0; i < cols; i++ ) {
		for ( var j = 0; j < rows; j++ ){
			grid[i][j] = new Cell(i, j, w);
		}
	}

	// set random bees
	var randomSet = getRandomList(cols, rows, totalBees);
	for( var pos of randomSet ){
		var i = pos % cols;
		var j = floor(pos / rows);
		console.log(i, j);
		grid[i][j].bee = true;
	}

	for ( var i = 0; i < cols; i++ ) {
		for ( var j = 0; j < rows; j++ ){
			grid[i][j].countBees();
		}
	}

	for ( var i = 0; i < cols; i++ ) {
		for ( var j = 0; j < rows; j++ ){
			grid[i][j].show();
		}
	}
}

function gameOver(){
	for ( var i = 0; i < cols; i++ ) {
		for ( var j = 0; j < rows; j++ ){
			grid[i][j].reveal();
		}
	}
}

function mousePressed() {
	for ( var i = 0; i < cols; i++ ) {
		for ( var j = 0; j < rows; j++ ){
			if( grid[i][j].contains(mouseX, mouseY) ){
				grid[i][j].reveal();
				if(grid[i][j].bee){
					gameOver();
				}
			}
		}
	}
}

function draw() {

}
