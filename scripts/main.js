var game = new Phaser.Game(740, 950, Phaser.CANVAS, "");

var maze = [];
var mazeWidth = 35;
var mazeHeight = 32;
var tileSize = 20;
var mazeGroup;
var upPressed = 0, downPressed = 0, leftPressed = 0, rightPressed = 0;
// var mazeGraphics;

var GameState = {
     preload: function(){
          this.load.image('maze', 'assets/images/maze.png');
          this.load.image('ball', 'assets/images/ball2.png');
          this.load.spritesheet('cursorbutton', 'assets/images/arrowkey.png', 70, 70);
     },
     create: function(){
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.scale.pageAlignHorizontally = true;
          this.scale.pageAlignVertically = true;
          this.game.physics.startSystem(Phaser.Physics.ARCADE);
          // mazeGraphics = game.add.graphics(0, 0);
          mazeGroup = game.add.group();
          var moves = [];
          for(var i = 0; i < mazeHeight; i ++){
               maze[i] = [];
               for(var j = 0; j < mazeWidth; j ++){
                    maze[i][j] = 1;
               }
          }
          var posX = 1;
          var posY = 1;
          maze[posX][posY] = 0; 
          moves.push(posY + posY * mazeWidth);          
          while(moves.length){       
               var possibleDirections = "";
               if(posX+2 > 0 && posX + 2 < mazeHeight - 1 && maze[posX + 2][posY] == 1){
                    possibleDirections += "S";
               }
               if(posX-2 > 0 && posX - 2 < mazeHeight - 1 && maze[posX - 2][posY] == 1){
                    possibleDirections += "N";
               }
               if(posY-2 > 0 && posY - 2 < mazeWidth - 1 && maze[posX][posY - 2] == 1){
                    possibleDirections += "W";
               }
               if(posY+2 > 0 && posY + 2 < mazeWidth - 1 && maze[posX][posY + 2] == 1){
                    possibleDirections += "E";
               } 
               if(possibleDirections){
                    var move = game.rnd.between(0, possibleDirections.length - 1);
                    switch (possibleDirections[move]){
                         case "N": 
                              maze[posX - 2][posY] = 0;
                              maze[posX - 1][posY] = 0;
                              posX -= 2;
                              break;
                         case "S":
                              maze[posX + 2][posY] = 0;
                              maze[posX + 1][posY] = 0;
                              posX += 2;
                              break;
                         case "W":
                              maze[posX][posY - 2] = 0;
                              maze[posX][posY - 1] = 0;
                              posY -= 2;
                              break;
                         case "E":
                              maze[posX][posY + 2]=0;
                              maze[posX][posY + 1]=0;
                              posY += 2;
                              break;         
                    }
                    moves.push(posY + posX * mazeWidth);     
               }
               else{
                    var back = moves.pop();
                    posX = Math.floor(back / mazeWidth);
                    posY = back % mazeWidth;
               }                                 
          }
          this.drawMaze(posX, posY)
          
          this.finalTile = this.game.add.sprite(mazeHeight*tileSize+40, mazeWidth*tileSize-100, 'maze');
          this.finalTile.tint =  0x00CC00;
          this.game.physics.arcade.enable(this.finalTile);

          this.ball = this.game.add.sprite(45, 45, 'ball');
          this.ball.scale.setTo(0.05);
          this.game.physics.arcade.enable(this.ball);
          // console.log(this.ball.width)
          // this.ball.tint = Math.random() * 0xffffff;

          cursors = game.input.keyboard.createCursorKeys();
          
          this.upkey = game.add.button(360, 750, 'cursorbutton', this.resetUpClick, this, 2, 1, 0);
          this.upkey.anchor.setTo(0.5);
          this.upkey.scale.setTo(1.2); 
          this.upkey.onInputDown.add(function() { upPressed=1; }, this);

          this.downkey = game.add.button(360, 860, 'cursorbutton', this.resetDownClick, this, 2, 1, 0);
          this.downkey.anchor.setTo(0.5);
          this.downkey.angle = 180;
          this.downkey.scale.setTo(1.2);
          this.downkey.onInputDown.add(function() { downPressed=2; }, this);

          this.leftkey = game.add.button(240, 805, 'cursorbutton', this.resetLeftClick, this, 2, 1, 0);
          this.leftkey.anchor.setTo(0.5);
          this.leftkey.angle = -90;
          this.leftkey.scale.setTo(1.2);
          this.leftkey.onInputDown.add(function() { leftPressed=3; }, this);

          this.rightkey = game.add.button(480, 805, 'cursorbutton', this.resetRightClick, this, 2, 1, 0);
          this.rightkey.anchor.setTo(0.5);
          this.rightkey.angle = 90;
          this.rightkey.scale.setTo(1.2);
          this.rightkey.onInputDown.add(function() { rightPressed=4; }, this);

          // console.log(button); 
     },
     resetUpClick:function(){
          upPressed = 0;
     },
     resetDownClick:function(){
          downPressed = 0;
     },
     resetLeftClick:function(){
          leftPressed = 0;
     },
     resetRightClick:function(){
          rightPressed = 0;
     },
     update: function(){
          // console.log(flag);
          this.ball.body.velocity.x = 0;
          this.ball.body.velocity.y = 0;
          if (cursors.up.isDown || upPressed === 1){
               this.ball.body.velocity.y = -250;
          }
          if (cursors.down.isDown || downPressed === 2){
               this.ball.body.velocity.y = 250;
          }
          if (cursors.left.isDown || leftPressed === 3){
               this.ball.body.velocity.x = -250;
          }
          if (cursors.right.isDown || rightPressed === 4){
               this.ball.body.velocity.x = 250;
          }
          this.game.physics.arcade.collide(this.ball, mazeGroup);
          this.game.physics.arcade.overlap(this.ball, this.finalTile, this.gameOver, null, this);
     },
     gameOver: function(){
          alert('You Won');
          window.location.reload(true);
     },
     drawMaze: function(){
          // mazeGraphics.clear();
          // mazeGraphics.beginFill(0xcccccc);
          for(i = 1; i <= mazeHeight; i ++){
               for(j = 1; j <= mazeWidth; j ++){
                    if(maze[i-1][j-1] == 1){
                         var mazing = this.game.add.sprite(j * tileSize, i * tileSize, 'maze');
                         this.game.physics.arcade.enable(mazing);
                         mazing.body.immovable = true;
                         mazeGroup.add(mazing);
                         // mazeGraphics.drawRect(j * tileSize, i * tileSize, tileSize, tileSize);             
                    }
               }
          }
          this.game.physics.arcade.enable(mazeGroup);
          // mazeGroup.body.immovable = true;
          // mazeGraphics.endFill();
     }
}
game.state.add('GameState', GameState);
game.state.start('GameState');
