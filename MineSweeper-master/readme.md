![p5](https://img.shields.io/badge/games-p5.js-E91E63.svg?colorA=00C853)
![ctcc](https://img.shields.io/badge/CodingTrain-CodingChallenges-4FC3F7.svg?colorA=FFA000)

##	Inspiration

*	[Coding Challenge 71: Minesweeper](https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_71_minesweeper)

##	Demo

*	[Demo1](https://jjayyyyyyy.github.io/MineSweeper/Demo1) is my init version of Minesweeper, with lots of TODOs.

	*	rightClick to mark a mine
	*	css
	*	custom setting
	*	timer

<br>

*	[Demo2](https://jjayyyyyyy.github.io/MineSweeper/Demo2) is cloned from the original project: [Coding Challenge 71: Minesweeper](https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_71_minesweeper).

	In order to avoid a high CPU usage, some changes are made as below to optimize the performance.

	*	**Step 1**

		`grid[i][j].show()` is removed from the nested-for-loop in function `draw()`.

		```javascript
		function draw() {
			// empty
		}
		```

	*	**Step 2**

		[FPS](https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#frames-per-second-fps) is changed from 60(default) to 10. And we have to draw the gameboard in `setup()`.

		```javascript
		function setup() {
			createCanvas(401, 401);


			/*set fps to 10*/
			frameRate(10);
			/***************/


			// ... other setup remains the same
			// ********************************

			/* draw the gameboard */
			for (var i = 0; i < cols; i++) {
				for (var j = 0; j < rows; j++) {
					grid[i][j].show();
				}
			}
			/**********************/
		}
		```

	*	**Step 3**

		Since `mousePressed()` will trigger `grid[i][j].reveal()`, it would be good to call `show()` inside `reveal()`.

		```javascript
		Cell.prototype.reveal = function() {
			this.revealed = true;
			this.show();	// this.show() is placed here


			if (this.neighborCount == 0) {
				// flood fill time
				this.floodFill();
			}
		}
		```

	*	**Step 4**

		Lastly, we will modify the function `gameover()`.

		```javascript
		function gameOver() {
			for (var i = 0; i < cols; i++) {
				for (var j = 0; j < rows; j++) {
					// grid[i][j].revealed = true;
					grid[i][j].reveal();
				}
			}
		}
		```
