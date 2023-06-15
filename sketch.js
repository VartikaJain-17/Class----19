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

  spookySound.loop()

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

 

  doorsGroup = new Group ()
  climbersGroup = new Group ()
  invisibleBlockGroup = new Group ()

  ghost = createSprite(200,400)
  ghost.addImage("ghost" , ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background(200)

  if(gameState == "play"){
  if(keyDown ("left")){
      ghost.x = ghost.x-3
  }

  if(keyDown ("right")){
    ghost.x = ghost.x+3
}

if(keyDown ("space")){
  ghost.velocityY = -4
}
 
   ghost.velocityY = ghost.velocityY + 0.5

  if(tower.y > 400){
      tower.y = 300
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }

    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy()
      gameState = "end"
    }
    drawSprites()
    spawnDoors()
  }

  if(gameState == "end"){
    textSize(35)
    fill("black")
    text("GameOver", 200,300) 
  }

}

function spawnDoors(){
  
  if(frameCount % 200 == 0){
    door = createSprite(100,-50)
    door.x = random(100,500)
    door.addImage("door" , doorImg)
    door.velocityY = 1
    doorsGroup.add(door)

    climber = createSprite(100,0)
    climber.x = door.x 
    climber.addImage("climber" , climberImg)
    climber.velocityY = 1
    climbersGroup.add(climber)

    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1

   invisibleBlock = createSprite(100,0)
    invisibleBlock.x = door.x 
   invisibleBlock.velocityY = 1
    invisibleBlockGroup.add(invisibleBlock)
   invisibleBlock.debug = true
   invisibleBlock.width = climber.width
   invisibleBlock.height = 2

   door.lifetime = 650
   climber.lifetime = 650
  }
}