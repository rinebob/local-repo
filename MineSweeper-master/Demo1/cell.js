'use strict';

var offsetCol = [-1, 0, 1];
var offsetRow = [-1, 0, 1];


function Cell(col, row, w, bee) {
	this.col = col;
	this.row = row;
	this.w = w;

	this.x = col * w;
	this.y = row * w;

	this.bee = bee;
	// this.revealed = false;
	this.revealed = false;
	this.totalNeighborBees = 0;
}

Cell.prototype.show = function(){
	fill(255);
	rect(this.x, this.y, this.w, this.w);

	if ( this.revealed ) {
		if( this.bee ){
			fill(100);
			ellipse(this.x + this.w/2, this.y + this.w/2, w/2, w/2);
		}else{
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			if( this.totalNeighborBees > 0 ){
				fill(0);
				textAlign(CENTER);
				// rect(this.x, this.y, this.w, this.w);
				text(this.totalNeighborBees, this.x+w/2, this.y+w/2);
			}
		}
	}
}

Cell.prototype.contains = function(x, y){
	return (x > this.x) && (x < this.x + this.w) && (y > this.y) && (y < this.y + this.w);
}


Cell.prototype.reveal = function(){
	this.revealed = true;
	this.show();
	if(this.totalNeighborBees == 0){
		this.floodFill();
	}
}

Cell.prototype.floodFill = function(){

	for( var oCol of offsetCol ){
		for (var oRow of offsetRow ){
			var i = this.col + oCol;
			var j = this.row + oRow;
			if( (i > -1) && (i < cols) && (j > -1) && (j < rows) ){
				var neighbor = grid[i][j];
				if( !neighbor.revealed ){
					neighbor.reveal();
				}
			}

		}
	}
}

Cell.prototype.countBees = function(){
	if( this.bee ){
		this.totalNeighborBees = -1;
		return;
	}

	for( var oCol of offsetCol ){
		for (var oRow of offsetRow ){
			var i = this.col + oCol;
			var j = this.row + oRow;
			if( (i > -1) && (i < cols) && (j > -1) && (j < rows) ){
				var neighbor = grid[i][j];
				if( neighbor.bee ){
					this.totalNeighborBees++;
				}
			}

		}
	}
}
