//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver,restart;

function preload(){
  trex_running = loadAnimation("perman1.jpg");
  
  
 
 cloudImage = loadImage("cloud2.png");
  
bg = loadImage("bg.jpg");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth - 15,displayHeight - 145);
  
  trex = createSprite(50,208,20,50);
 trex.addAnimation("running", trex_running);
  
  trex.scale = 0.7;
  
  ground = createSprite(200,400,2000,20);
  
  ground.shapeColor = "lightblue";
 // ground.addImage("ground",groundImage);
 ground.visible=false; 

  trex.velocityX=0;
  trex.velocityY=0;
  
  
  invisibleGround = createSprite(200,10,4000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(650,400);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  restart = createSprite(650,450);
  restart.addImage(restartImg);
  restart.scale = 1;
  restart.visible = false;
  
  score = 0;
}

function draw() {
  background(bg);
  textSize(35)
  text("Score: "+ score, 1300,50);
fill("black")
  text("Use the arrows to dodge the aeroplanes and help PERMAN fly ",10,50)
  
  if(gameState === PLAY){
   
  score = score + Math.round(getFrameRate()/60);

  if (keyDown( RIGHT_ARROW)) {
    trex.velocityX=2;
   trex.velocityY=0;
     
  }
 if (keyDown(LEFT_ARROW)) {
   trex.velocityX=-2;
  trex.velocityY=0;
 }
 if (keyDown(UP_ARROW)) {
   trex.velocityX=0;
 trex.velocityY=-2;
     
        
 }
if (keyDown(DOWN_ARROW)) {
trex.velocityX=0;
  trex.velocityY=2;
          
 }

  
  
  
  
  
  
  // if (ground.x < 0){
  //   ground.x = ground.width/2;
  // }
  
  trex.collide(invisibleGround);
  trex.collide(ground)
  spawnClouds();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
     gameState = END; 
    }
    
  }
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityX=0;
  trex.velocityY=0;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
  

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(2000,300,40,10);
    
   
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -7;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(2000,170,10,40);
    obstacle.y = Math.round(random(80,400));
    obstacle.velocityX = -7;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.22;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  
  gameOver.visible = false;
  restart.visible = false;
  
  gameState=PLAY;
  trex.x=50
  trex.y=208;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score=0;
  
  trex.changeAnimation("running",trex_running);
}