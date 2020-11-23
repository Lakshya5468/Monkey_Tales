var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, ground, wall1, wall2;
var score=0;
var survivalTime=0;
var gameState=1;
var END=0;
var PLAY=1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(100,250,20,20);
  monkey.addAnimation("monkeyRunner", monkey_running);
  monkey.scale=0.3;
  ground=createSprite(300,300,1200,10);
  ground.velocityX=-5;
  ground.visible=false;
  wall1=createSprite(0,200,40,400);
  wall1.visible=false;
  wall2=createSprite(200,0,400,40);
  wall2.visible=false;
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  gameState=PLAY;
}


function draw() {
  background("green");
  monkey.debug=true;
  if (gameState===PLAY){
  survivalTime=Math.ceil(frameCount/frameRate());
  spawnBananas();
  spawnObstacle();
  }
  if(gameState===END){
    stroke("black");
  textSize(20);
  fill("black");
    text("You Died because, You Became Too Small to Exist.",30,200)
  foodGroup.setVelocityEach=0;
  obstacleGroup.setVelocityEach=0;
  }
  stroke("black");
  textSize(20);
  fill("black");
  text("Score :"+score,250,350);
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time :"+survivalTime,200,50);
  monkey.collide(ground);
if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")){
    monkey.velocityY=-8;
  }
  if(monkey.isTouching(obstacleGroup)){
    monkey.scale=monkey.scale/2;
  }
  if(monkey.isTouching(foodGroup)){
    score=score+2;
    foodGroup.destroyEach();
  }
  if(monkey.scale<0.1){
    monkey.destroy();
    gameState=END;
  }
  monkey.velocityY=monkey.velocityY+0.3;
  //monkey.collide(obstacleGroup);
  monkey.collide(wall1);
  //console.log(monkey.scale);
  createEdgeSprites();
 drawSprites(); 
}

function spawnBananas(){
  if(frameCount%130===0){
    banana=createSprite(610,300,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=random(10,250);
    banana.velocityX=-5;
    foodGroup.add(banana);
  }
}
function spawnObstacle(){
  if(frameCount%180===0){
    obstacle=createSprite(610,280,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-5;
    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,1)
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(200);
  }
}