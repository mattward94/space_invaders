
  var levelData = { 
     1:  [[0,0,1,0,1,0,1,0,1,0,0],
          [0,0,4,0,4,0,4,0,4,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,0,2,0,2,0,2,0,0],
          [0,0,2,0,2,0,2,0,2,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,3,0,3,0,3,0,3,0,0],
          [0,0,4,0,4,0,4,0,4,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     2:  [[0,0,2,0,2,0,2,0,2,0,0],
          [0,0,2,0,2,0,2,0,2,0,0],
          [0,0,2,0,2,0,2,0,2,0,0],
          [0,0,1,0,1,0,1,0,1,0,0],
          [0,0,1,0,1,0,1,0,1,0,0],
          [0,0,3,0,3,0,3,0,3,0,0],
          [0,0,4,0,4,0,4,0,4,0,0],
          [0,0,4,0,4,0,4,0,4,0,0],
          [0,0,4,0,4,0,4,0,4,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],  
     3:  [[3,0,3,0,3,0,3,0,3,0,3],
          [0,0,0,0,0,0,0,0,0,0,0],
          [4,0,4,0,4,0,4,0,4,0,4],
          [0,0,0,0,0,0,0,0,0,0,0],
          [2,0,2,0,2,0,2,0,2,0,2],
          [0,0,0,0,0,0,0,0,0,0,0],
          [3,0,3,0,3,0,3,0,3,0,3],
          [0,0,0,0,0,0,0,0,0,0,0],
          [1,0,1,0,1,0,1,0,1,0,1],
          [0,0,0,0,0,0,0,0,0,0,0],
          [1,0,1,0,1,0,1,0,1,0,1]] };


  var spriteData = {
    'alien1': { sx: 0,  sy: 100,  w: 37, h: 28 , cls: Alien, frames: 2 },
    'alien2': { sx: 0,  sy: 129, w: 37, h: 28, cls: Alien, frames: 2 },
    'alien3': { sx: 0,  sy: 157, w: 37, h: 28, cls: Alien, frames: 2 },
    'alien4': { sx: 0,  sy: 185, w: 37, h: 28, cls: Alien, frames: 2 },   
    'player': {  sx: 61,  sy: 51, w: 33,  h: 28, cls: Player },
    'missile': { sx: 0,  sy: 86, w: 3,  h: 14, cls: Missile },
      
   // 'explosion': { sx: 50,  sy: 0, w: 48,  h: 36, cls: Explosion, frames: 6}, 
      
  }

  function startGame() {
    var screen = new GameScreen("SPACE INVADERS","PRESS SPACE TO START THE ADVENTURE...","",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
       var screen = new GameScreen("GAME OVER.","Score : " +playerScore,"(Press space to restart)",
                                 function() { 
                                     playerScore = 0;
                                     Game.loadBoard(new GameBoard(1));
    $('#lifes').html('<img src="images/heart.gif" class="life" /><img src="images/heart.gif" class="life" /><img src="images/heart.gif" class="life" />');
                                 });
    Game.loadBoard(screen);
  }



  function winGame() {
    var screen = new GameScreen("YOU WIN!","Score : " +playerScore,"(press space to restart)","",
                                 function() {
                                     playerScore = 0;
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/gun.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



