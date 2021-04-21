var track,trackimg;
var runner,runnerimg;
var cash,cashimg,cashgroup;
var diamond,diamondimg,diamondgroup;
var jwell,jwellimg,jwellgroup;
var sword,swordimg,swordgroup;
var gameover,gameoverimg;
var sound;


var PLAY=1;
var END=0;
var gameState=1;

var score = 0;



function preload(){
  trackimg=loadImage("images/track.jpg");
  runnerimg=loadAnimation("images/Runner-1.png","images/Runner-2.png");
  cashimg=loadImage("images/cash.png");
  diamondimg=loadImage("images/diamonds.png");
  jwellimg=loadImage("images/jwell.png");
  swordimg=loadImage("images/sword.png");
  gameover=loadImage("images/gameover.png");
  sound=loadSound("gameover sound effect.mp3");
}

function setup() {
  createCanvas(800,600);
  
  track=createSprite(400, 200, 50, 50);
  track.addImage(trackimg);
  track.velocityY=1;
  
  runner=createSprite(400,500,50,50);
  
  runner.addAnimation("running",runnerimg);
  runner.addAnimation("end",gameover);
  runner.scale=0.1;

  cashgroup=new Group();   
  diamondgroup=new Group();
  jwellgroup=new Group();
  swordgroup=new Group();

  





 

  
}

function draw() {
  background("black");

  if (gameState === PLAY){
    
    runner.x=World.mouseX;
  
    edges=createEdgeSprites();
    runner.collide(edges);

   
    if(track.y > 400 ){
      track.y = height/2;
    }

    createCash();
    creatediamond();
    createjwell();
    createsword();

   if (cashgroup.isTouching(runner)){
    cashgroup.destroyEach();
    score=score+2;
   }
   else if( diamondgroup.isTouching(runner)){
     diamondgroup.destroyEach();
     score=score+4;

   }else if(jwellgroup.isTouching(runner)){
     jwellgroup.destroyEach();
     score=score+6;
     

   }else if(swordgroup.isTouching(runner)){
     gameState=END;
     runner.changeAnimation("end",gameover);
     runner.x=400;
     runner.y=300;
     runner.scale=1;
    track.velocityY=0;
    sound.play();

     cashgroup.destroyEach();
     diamondgroup.destroyEach();
     jwellgroup.destroyEach();
     swordgroup.destroyEach();

     cashgroup.setVelocityYEach(0);
     diamondgroup.setVelocityYEach(0);
     jwellgroup.setVelocityYEach(0);
     swordgroup.setVelocityYEach(0);

    }

   }
  
    drawSprites();
   fill("white");
   textSize(20);
   text("SCORE : " + score, 400,100);
  }
  


function createCash(){
  if(frameCount % 200 ==0){
    cash=createSprite(Math.round(random(200,600)),10,20,20);
    cash.velocityY=3;
    cash.addImage(cashimg);
    cash.scale=0.15;
    cash.lifetime=150;
    cashgroup.add(cash);
    
  }
}

function creatediamond(){
  if(frameCount % 100 ==0){
    diamond=createSprite(Math.round(random(200,600)),10,10,20);
    diamond.velocityY=4;
    diamond.addImage(diamondimg);
    diamond.scale=0.05;
    diamond.lifetime=150;
    diamondgroup.add(diamond);
  }
}

function createjwell(){
  if(frameCount % 150 ==0){
    jwell=createSprite(Math.round(random(200,600)),10,10,20);
    jwell.velocityY=2;
    jwell.addImage(jwellimg);
    jwell.scale=0.2;
    jwell.lifetime=150;
    jwellgroup.add(jwell);
  }
}

function createsword(){
  if(frameCount % 300 ==0){
    sword=createSprite(Math.round(random(200,600)),10,15,30);
    sword.velocityY=5;
    sword.addImage(swordimg);
    sword.scale=0.1;
    sword.lifetime=150;
    swordgroup.add(sword);
  }
}














