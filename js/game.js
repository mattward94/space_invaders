
/**window.setInterval("revampDiv()", 100);  
            function revampDiv(){ 
                
                document.getElementById("score").innerHTML = score;  
            }  **/



var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 30;

  this.draw = function() {};

  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}



var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  playerScore++;
  if(this.board.remove(this)) {
  this.board.add(new Explosion(this.x + this.w/2, 
                                   this.y + this.h/2));
    
}
}

Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx; //this controls the alien movement left and right
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 20) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
      
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 2;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}


Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 100) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 300 }); //speed of fire
      }
}

var Player = function Player(opts) { 
  this.reloading = 0;

}

var countx = 0
Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
    var boo = (countx++) %6; //speed of fire
    console.log(countx);
    if (boo == 1){
        console.log("missile");
        this.fireSometimes();
    }
    
    
   
}


Player.prototype.die = function() {
  //loseLife();
  GameAudio.play('die');
    $('#gameboard').stop().css('background', 'darkred').animate({backgroundColor: 'black'}, 2000);
  if($('.life:visible').length) $('.life:last').remove();
  else endGame();
    return true;
	
	
}
Player.prototype.fireSometimes = function() {
      if (Math.random()*1){
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h-30, 
                                     { dy: -500 }); //distance between each missille
      }
}

Player.prototype.step = function(dt) {
      
  if(Game.keys['left']) { this.x -= 200 * dt; }
  if(Game.keys['right']) { this.x += 200 * dt; }    
  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;

  this.reloading--;
  

    

/*if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 3) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 10;
  }*/
  return true;
}



var playerScore =0; 
scorerInterval = setInterval(function() {
  document.getElementById("score").innerHTML = playerScore;  
    

    
});



var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

/*
var Explosion = function(centerX,centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 6) {
    this.board.remove(this);
  }
};
*/


