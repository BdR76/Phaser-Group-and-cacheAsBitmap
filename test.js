// bitmaptext testing centered function
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;

var TILE_SIZE = 40;

// -------------------------------------
// define mygame state
// -------------------------------------
var mygame = {};
mygame.Screen1 = function(game){
    this.game = game;
	this.myblocks = [];
};
mygame.Screen1.prototype = {
	preload: function() {
		this.load.spritesheet('tiles', 'tiles.png', TILE_SIZE, TILE_SIZE);
	},

    create: function() {
		// TESTING draw rectangle
		this.stage.backgroundColor = 0x808080;
	
		// tile 1
		for (var i = 0; i < 7; i++) {
			// new object sprite
			var newobj = new TetrisBlock(game, i);
			this.myblocks.push(newobj);
			newobj.x = newobj.x + (i*100);
			newobj.y = newobj.y + (i*8);
			
			// a little animation
			
			// animate handicon
			//var mytween = this.game.add.tween(newobj).to({x: 400}, 500+(i*200), Phaser.Easing.Quadratic.InOut) // duration=1000ms, delay=200ms
			//.to({x: 0}, 500+(i*200), Phaser.Easing.Quadratic.InOut)
			//.repeatAll(100)
			//.start();
			
		};
		

			
    }
};

// -------------------------------------
// tetris blocks
// -------------------------------------

// block object constructor
var TetrisBlock = function(game, blocktype) {
	// inherits from Phaser.Group
	Phaser.Group.call(this, game);

	// save which block type
	this.blocktype = blocktype;
	
	switch(blocktype) {
		case 1: // 'l' tetris block
			this.initBlock(".#...#...#...#..");
		case 2: // 'S' tetris block
			this.initBlock(".....##.##......");
		case 3: // 'Z' tetris block
			this.initBlock(".....##...##....");
		case 4: // 'L' tetris block
			this.initBlock(".....#...#...##.");
		case 5: // 'J' tetris block
			this.initBlock("......#...#..##.");
		case 6: // 'T' tetris block
			this.initBlock(".....###..#.....");
		default: // 0 = 'O' tetris block
			this.initBlock(".....##..##.....");
	};
};

// Specific JavaScript object/construcor stuff going on here(?)
// game objects are a type of Phaser.Sprite
TetrisBlock.prototype = Object.create(Phaser.Group.prototype);
TetrisBlock.prototype.constructor = TetrisBlock;

// TetrisBlock initialise sprites for block configuration
TetrisBlock.prototype.initBlock = function(str) {

	// phaser.sprite.reset
	var x = 0;
	var y = 0;
	for (var i=0; i < str.length; i++) {
		// block or no block
		if (str.substr(i, 1) == '#') {
			// calculate position
			var xpos = x * TILE_SIZE;
			var ypos = y * TILE_SIZE;
			// add sprite to game
			var sprblock = this.game.add.sprite(xpos, ypos, 'tiles', this.blocktype); 
			this.add(sprblock);
		};
		// next 'grid' position
		x++;
		if (x > 3) {
			x=0;
			y++;
		};
	};
	
	// cache all sprites as 1 bitmap, else small lines sometimes appear between block parts
	//this.cacheAsBitmap = true;
};

// -------------------------------------
// define Phaser game and add states
// -------------------------------------
var game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.CANVAS, 'game');

game.state.add('Screen1', mygame.Screen1);
game.state.start('Screen1');
