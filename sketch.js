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
  
  ghost=createSprite(300,400)
  ghost.addImage(ghostImg)
  ghost.scale=0.5

  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
  
}

function draw() {
  background(200);
  if(gameState=="play"){

  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3

    }
   if(keyDown("right_arrow")){
    ghost.x=ghost.x+3

   }
   if(keyDown("space")){
    ghost.velocityY=-3

   }
   ghost.velocityY=ghost.velocityY+0.5
   spawnDoors()
    drawSprites() 
    
    if(climbersGroup.isTouching(ghost)){

     ghost.velocityY=0 

    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState="end"
    } 
  }
    if(gameState=="end"){
      text("gameover",300,300)
    }
}
  function spawnDoors(){
    if(frameCount%250==0){

    
    var door=createSprite(200,300)
    door.addImage(doorImg)

    var climber=createSprite(200,350)
    climber.addImage(climberImg)

    var invisibleBlock=createSprite(200,370)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlock.debug=true

    door.velocityY=1
    climber.velocityY=1
    invisibleBlock.velocityY=1
    door.x=Math.round(random(120,400))
    climber.x=door.x
    invisibleBlock.x=door.x

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

    ghost.depth=door.depth
    ghost.depth+=1
    }


  }
