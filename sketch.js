var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x -3;
    }
    
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }

    if(ghost.isTouching(invisibleBlockGroup)|| ghost.y>600){
      gameState = "end"
    }

    spawnDoors();
    drawSprites();
  }
  else if(gameState === "end"){
    ghost.destroy();
    textSize(30);
    text("GAME OVER", 200, 300)
  } 
  

  
}

function spawnDoors(){
  if(frameCount%240 === 0){
    var door = createSprite(200, -50)
    door.addImage(doorImg)
    door.x = Math.round(random(120,400))
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);

    door.depth = ghost.depth;
    ghost.depth++

    var climber = createSprite(200, 10)
    climber.addImage(climberImg)
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    var invisibleBlock = createSprite(200, 15, climber.width, 2)
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
