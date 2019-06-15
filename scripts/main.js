var game = new Phaser.Game(700, 650, Phaser.CANVAS, "");
var maze = [];
var mazeWidth = 35;
var mazeHeight = 32;
var tileSize = 20;
var mazeGraphics;

var GameState = {
     preload: function(){
     //    this.load.image('background', 'assets/images/background2.png');
     },
     create: function(){
          // console.log("create");
          mazeGraphics = game.add.graphics(0, 0);
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
     },
     update: function(){
     },
     drawMaze: function(){
          // console.log('draw');
          mazeGraphics.clear();
          mazeGraphics.beginFill(0xcccccc);
          for(i = 0; i < mazeHeight; i ++){
               for(j = 0; j < mazeWidth; j ++){
                    if(maze[i][j] == 1){
                         mazeGraphics.drawRect(j * tileSize, i * tileSize, tileSize, tileSize);                 
                    }
               }
          }
          mazeGraphics.endFill();
     }
}
game.state.add('GameState', GameState);
game.state.start('GameState');


