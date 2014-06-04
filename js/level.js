
  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,1,1,0,0,0,0,0,0,0,0],
          [0,1,1,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [2,0,2,0,2,0,2,0,2,0,2],
          [2,0,2,0,2,0,2,0,2,0,2],
          [2,0,2,0,2,0,2,0,2,0,2],
          [2,0,2,0,2,0,2,0,2,0,2],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]], 
     3:  [[1,0,1,0,1,0,1,0,1,0,1],
          [0,0,0,0,0,0,0,0,0,0,0],
          [1,0,1,0,1,0,1,0,1,0,1],
          [0,0,0,0,0,0,0,0,0,0,0],
          [2,0,2,0,2,0,2,0,2,0,2],
          [0,0,0,0,0,0,0,0,0,0,0],
          [2,0,2,0,2,0,2,0,2,0,2],
          [0,0,0,0,0,0,0,0,0,0,0],
          [1,0,1,0,1,0,1,0,1,0,1],
          [0,0,0,0,0,0,0,0,0,0,0],
          [1,0,1,0,1,0,1,0,1,0,1]] };


  var spriteData = {
    'alien1': { sx: 0,  sy: 100,  w: 66, h: 46, cls: Alien, frames: 2 },
    'alien2': { sx: 0,  sy: 18, w: 23, h: 18, cls: Alien, frames: 2 },
    'alien3': { sx: 20,  sy: 18, w: 23, h: 18, cls: Alien, frames: 2 }, 
    'player': { sx: 0,  sy: 36, w: 26, h: 17, cls: Player },
    'missile': { sx: 0,  sy: 86, w: 3,  h: 14, cls: Missile },
      
   // 'explosion': { sx: 50,  sy: 0, w: 48,  h: 36, cls: Explosion, frames: 6}, 
      
  }

  function startGame() {
    var screen = new GameScreen("Alien Invaders","press space to start","",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
       var screen = new GameScreen("Game Over","Score : " +playerScore,"(press space to restart)",
                                 function() { 
                                     playerScore = 0;
                                     Game.loadBoard(new GameBoard(1));
    $('#lifes').html('<img src="images/heart.gif" class="life" /><img src="images/heart.gif" class="life" /><img src="images/heart.gif" class="life" />');
                                 });
    Game.loadBoard(screen);
  }



  function winGame() {
    var screen = new GameScreen("You Win!","Score : " +playerScore,"(press space to restart)","",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/explosion.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



