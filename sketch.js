var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var b1, lp, b2, hab, bird
var START = 2, PLAY = 1, END = 0;
var gameState = START;
var restart, restartImg
var gameOver, gameOverImg
var score = 0;
var die, jump

function preload(){
bgImg = loadAnimation("assets/bg.png", "assets/bg.png", "assets/bg.png", "assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

b1 = loadImage("assets/obsBottom1.png");
lp = loadImage("assets/obsBottom2.png");
b2 = loadImage("assets/obsBottom3.png");
hab = loadImage("assets/obsTop1.png");
bird = loadImage("assets/obsTop2.png");

restartImg = loadImage("assets/restart.png");
gameOverImg = loadImage("assets/gameOver.png");

die = loadSound("assets/die.mp3");
jump = loadSound("assets/jump.mp3");

}

function setup(){
createCanvas(600,600);

//background image
bg = createSprite(165,485,1,1);
bg.addAnimation("backImg", bgImg);
bg.scale = 1.3
bg.velocityX = -1;

//creating top and bottom grounds
bottomGround = createSprite(400,590,1200,20);
//bottomGround.visible = false;
bottomGround.x = bottomGround.width/2;
bottomGround.velocityX = -2;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();

restart = createSprite(300, 300, 20, 20);
restart.addImage(restartImg);
restart.scale = 0.6;
restart.visible = false;

gameOver = createSprite(300, 200, 20, 20);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;
}

function draw() {
  
  background("black");

          if(gameState == PLAY){

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   

        if(balloon.isTouching(bottomGround)){
          balloon.velocityY = 0;
        }

        if(keyDown(UP_ARROW)){
          balloon.velocityY = -6;
          jump.play();
        }
        
        if (bottomGround.x < 0 ){
          bottomGround.x = bottomGround.width / 2;
          bg.x = 165;
        }

          spawnObstaclesTop();
          spawnObstaclesBottom();

          score = score + Math.round(frameCount % 60 == 0);

          if(balloon.collide(topObstaclesGroup) || balloon.collide(bottomObstaclesGroup)){
            die.play();
            gameState = END;
          }
          
          }
          else if(gameState == END){
            bottomGround.velocityX = 0;
            bg.velocityX = 0;
            balloon.velocityY = 0; 
            balloon.velocityX = 0;
            topObstaclesGroup.setVelocityXEach(0);
            bottomObstaclesGroup.setVelocityXEach(0);

            topObstaclesGroup.setLifetimeEach(-1);
            bottomObstaclesGroup.setLifetimeEach(-1);

            restart.visible = true;
            gameOver.visible = true;

            if(mousePressedOver(restart)){
              restartGame();
            }
          }


          drawSprites();


        if(gameState == START){
          textSize(18);
          fill("black");
          text("Press space key to play the game ", 150, 160);
          text("Rules of the game: ", 150, 210)
          text("1- Press up arrow key to jump", 150, 260);
          text("2- Avoid the obstacles to score", 150, 290);
          text("3- If you touch the obstacles, you lose", 150, 320);
          text("4- You can restart the game when you lose", 150, 350);
          text("5- Your score will be reset to zero when you restart the game", 100, 380);

          if (bottomGround.x < 0 ){
            bottomGround.x = bottomGround.width / 2;
            bg.x = 165;
          }

          if(keyDown("space")){
            gameState = PLAY;
          }
        }  

          textSize(18);
          fill("black");
          text("Score = " + score, 500, 50);

          }

        function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(hab);
              break;
      case 2: obstacleTop.addImage(bird);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;

   topObstaclesGroup.add(obstacleTop);
   
      }
}

function spawnObstaclesBottom() 
{
      if(World.frameCount % 60 === 0) {
        obstacleBottom = createSprite(400,525,40,50);
    
    obstacleBottom.scale = 0.07;
    obstacleBottom.velocityX = -4;
    
   //generate random bottom obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacleBottom.addImage(b1);
              break;
      case 2: obstacleBottom.addImage(lp);
              break;
      case 3: obstacleBottom.addImage(b2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleBottom.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;

   bottomObstaclesGroup.add(obstacleBottom);
   
      }

}

function restartGame(){
  gameState = PLAY;
  restart.visible = false;
  gameOver.visible = false;

  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();

  score = 0;
}

