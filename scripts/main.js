var game = new Phaser.Game(700, 650, Phaser.CANVAS, "");

var maze = [];
var mazeWidth = 35;
var mazeHeight = 32;
var tileSize = 20;
var mazeGroup;
// var mazeGraphics;

var GameState = {
     preload: function(){
        this.load.image('maze', 'assets/images/maze.png');
        this.load.image('ball', 'assets/images/ball2.png');

     },
     create: function(){
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

          this.ball = this.game.add.sprite(23, 23, 'ball');
          // console.log(this.ball.width)
          this.ball.scale.setTo(0.05);
          this.game.physics.arcade.enable(this.ball);

          this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
          this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
          this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
          this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
          game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN ]);
     },
     update: function(){
          this.ball.body.velocity.x = 0;
          this.ball.body.velocity.y = 0;
          if (this.upKey.isDown){
               this.ball.body.velocity.y = -200;
          }
          if (this.downKey.isDown){
               this.ball.body.velocity.y = 200;
          }
          if (this.leftKey.isDown){
               this.ball.body.velocity.x = -200;
          }
          if (this.rightKey.isDown){
               this.ball.body.velocity.x = 200;
          }
          this.game.physics.arcade.collide(this.ball, mazeGroup);
     },
     drawMaze: function(){
          // mazeGraphics.clear();
          // mazeGraphics.beginFill(0xcccccc);
          for(i = 0; i < mazeHeight; i ++){
               for(j = 0; j < mazeWidth; j ++){
                    if(maze[i][j] == 1){
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
