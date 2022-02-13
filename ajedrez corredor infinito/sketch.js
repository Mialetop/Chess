var PLAY = 1;
var OVER = 0;
var WIN = 2
var gameState = PLAY;

var character;
var Caballo_B_Img, alfil_B_Img, torre_B_Img, dama_B_Img;
var ground,invisibleGround, groundImage;


var peon_N_Img, caballo_N_Img, alfil_N_Img, torre_N_Img, dama_N_Img;

var score=0;
var knife, knifeimg;
var gameOver, gameOverImg, restart,  restartImg,youWin, youWinImg;



function preload(){
  Caballo_B_Img = loadImage("Imagenes/Caballo_B.png");
  alfil_B_Img = loadImage("Imagenes/Alfil_B.png");
  torre_B_Img = loadImage("Imagenes/Torre_B.png");
  dama_B_Img = loadImage("Imagenes/Dama_B.png");
  
  peon_N_Img = loadImage("Imagenes/Peon_N.png");
  caballo_N_Img = loadImage("Imagenes/Caballo_N.png");
  alfil_N_Img = loadImage("Imagenes/Alfil_N.png");
  torre_N_Img = loadImage("Imagenes/Torre_N.png");
  dama_N_Img = loadImage("Imagenes/Dama_N.png");
  
  gameOverImg = loadImage("Imagenes/gameOver.png");
  restartImg = loadImage("Imagenes/restart.png");
  youWinImg = loadImage("Imagenes/youWin.png")
  

  groundImage = loadImage("Imagenes/ground.jpg");
  knifeimg = loadImage("Imagenes/silver.jpg")
  

}

function setup() {
  createCanvas(450, 200);
  
  character = createSprite(50,180,20,50);
  if(score <= 3){
    character.addImage("Caballo", Caballo_B_Img);
    character.scale = 0.5;
  }else if(score >3 && score < 5){
    character.addImage("Alfil", Alfil_B_Img);
    character.scale = 0.5;
    }else if(score > 5 && score <9){
        character.addImage("Torre", Torre_B_Img);
        character.scale = 0.5;
    }else if(score > 9){
      character.addImage("Dama", Dama_B_Img);
      character.scale = 0.5;
    }

  knife =createSprite(Math.round(50,400), Math.round(0,200),10,10);
  knife.addImage("Knife", knifeimg);
  knife.scale = 0.5;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  youWin = createSprite(300,100);
  youWin.addImage(youWinImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  youWin.visible = false;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);

  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  fill("yellow");
  text("Score: "+ score, 500,50);
  
    if(keyDown("UP_ARROW") && caballo_B.y >= 159) {
      caballo_B.velocityY -= 10;
    }else if(keyDown("DOWN_ARROW")){
      caballo_B.velocityY += 10;
    }
  
    character.velocityY = character.velocityY + 0.8
  
   if (ground.x < 0){
     ground.x = ground.width/2;
   }
   character.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(character)){
      score++;
    }
    if(knife.isTouching(character)){
      gameState=0;
    }
  
  else if (gameState === WIN) {
    youWin.visible = true;
    
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  else if (gameState === OVER) {
    restart.visible = true;
    gameOver.visible = true;
    
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(Math.round(60,200),Math.round(100,600),10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    if(score<3){
      obstacle.addImage(peon_N);
      obstacle.scale = 0.5;
    }else if(score>3 && score < 5){
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(peon_N);
          break;
        case 2: obstacle.addImage(caballo_N);
          break;
        case 3: obstacle.addImage(alfil_N);
          break;
        default:
          break;
      }
      obstacle.scale = 0.5;
    }else if(score>5 && score<9){
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(peon_N);
          break;
        case 2: obstacle.addImage(caballo_N);
          break;
        case 3: obstacle.addImage(alfil_N);
          break;
        case 4: obstacle.addImage(torre_N);
        break;
        default:
        break;
      }
      
      obstacle.scale = 0.5;
    }else if(score>9){
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(peon_N);
                break;
        case 2: obstacle.addImage(caballo_N);
                break;
        case 3: obstacle.addImage(alfil_N);
                break;
        case 4: obstacle.addImage(torre_N);
                break;
        case 5: obstacle.addImage(dama_N);
                break;
        default:
          break;
      }
      
      obstacle.scale = 0.5;
    }
     
    
    
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
    score = 0;
  
}
