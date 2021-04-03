var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImg, bg;
var bird, birdimg; 
var pIMG1, pIMG2, pillar1, pillar2;
var pillarsGroup1, pillarsGroup2;
var gameState = PLAY;
var gm, gmIMG;
var restart, rIMG;
var score;

function preload(){

  bgImg = loadImage("images/b3.jpg")
  birdimg = loadImage("images/bird.png");
  pIMG1 = loadImage("images/pillar.png");
  pIMG2 = loadImage("images/pillar2.png");
  gmIMG = loadImage("images/gameOver.png");
  rIMG = loadImage("images/restart.png");
}

function setup() {
  createCanvas(1500,700);

  bg = createSprite(0,0,2000,3000);
  bg.addImage(bgImg);
  bg.scale = 5.4;

  bird = createSprite(200,300,100,50);
  bird.addImage(birdimg);
  bird.scale =0.3;

  //bird.debug = true; 
  bird.setCollider("rectangle", 0, 0, 150,150);

  gm = createSprite(750,350);
  gm.addImage(gmIMG);
  
  restart = createSprite(750,550);
  restart.addImage(rIMG);
  
  gm.scale = 1;
  restart.scale = 2;

  gm.visible = false;
  restart.visible = false;

  pillarsGroup1 = new Group();
  pillarsGroup2 = new Group();

  score = 0;
}

function draw() {

  

  if(gameState === PLAY){

    bg.velocityX = -6;

  if (bg.x < 0){
    bg.x = bg.width/2;
  }

  score = score + Math.round(getFrameRate()/60);

  if(keyDown("space")) {
    bird.velocityY = -6;
  }

  bird.velocityY =  bird.velocityY + 0.8;

  if(pillarsGroup1.isTouching(bird) || pillarsGroup2.isTouching(bird) || bird.y > 750){
    gameState = END;
  }

  spawnPillars();
} else if (gameState === END){

  bird.velocityY = 0;
  bg.velocityX = 0;
  pillarsGroup1.setVelocityXEach(0);
  pillarsGroup2.setVelocityXEach(0);
  pillarsGroup1.setLifetimeEach(-1);
  pillarsGroup2.setLifetimeEach(-1);
  gm.visible = true;
  restart.visible = true;

  if(mousePressedOver(restart)) {
    reset();
  }
}


  drawSprites();

  textSize(30);
  fill("white");
  text("Score: "+ score, 1000,50);
}




function spawnPillars(){

  if (frameCount % 60 === 0) {
    var pillar1 = createSprite(1000,100,50,600);
    pillar1.y = Math.round(random(1,50));
    pillar1.addImage(pIMG1);
    pillar1.scale = 0.8;
    pillar1.velocityX = -5;
    pillar1.lifetime = 400;
    pillarsGroup1.add(pillar1);

    pillar1.depth = restart.depth;
    restart.depth = restart.depth + 1;

    pillar1.depth = gm.depth;
    gm.depth = gm.depth + 1;
  }

  if (frameCount % 60 === 0) {
    var pillar2 = createSprite(1000,700);
    pillar2.y = Math.round(random(550,600));
    pillar2.addImage(pIMG2);
    pillar2.scale = 0.8;
    pillar2.velocityX = -5;
    pillar2.lifetime = 400;
    pillarsGroup2.add(pillar2);

    pillar2.depth = restart.depth;
    restart.depth = restart.depth + 1;

    pillar2.depth = gm.depth;
    gm.depth = gm.depth + 1;
  }

}

function reset(){
  gameState = PLAY;
  gm.visible = false;
  restart.visible = false;
  
  pillarsGroup1.destroyEach();
  pillarsGroup2.destroyEach();

  score = 0;

}