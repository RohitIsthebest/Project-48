var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup,bulletGroup

var score = 0
var life = 3;
var bullets = 70;
var bullet
var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;


function preload(){

  bgImg = loadImage("./assets/bg.jpeg")
  shooterImg = loadImage("./assets/shooter_2.png")
  shooter_shooting = loadImage("./assets/shooter_3.png")
  zombieImg = loadImage("./assets/zombie.png")
  heart1Img = loadImage("./assets/heart_1.png")
  heart2Img = loadImage("./assets/heart_2.png")
  heart3Img = loadImage("./assets/heart_3.png")
  
  lose = loadSound("./assets/lose.mp3")
  winning = loadSound("./assets/win.mp3")
  explosionSound = loadSound("./assets/explosion.mp3")
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  //the shooter
  player = createSprite(300,200)
  player.addImage("shooter1",shooterImg)
  player.addImage("shooter2",shooter_shooting)
  player.scale = 0.4

  heart1 = createSprite(windowWidth-40,40)
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4
  heart1.visible = false

  heart2 = createSprite(windowWidth-80,40)
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4
  heart2.visible = false

  heart3 = createSprite(windowWidth-120,40)
  heart3.addImage("heart1",heart3Img)
  heart3.scale = 0.4
  
  bulletGroup = new Group()
  zombieGroup = new Group()

  
}

function draw() {
  background(bgImg); 

  if(life === 3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }

  if(life === 2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }

  if(life === 1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }
  
  if(life === 0){
    gameState = "Lost"
    lose.play()
    life =3
  }
  if(bullets === 0){
    gameState = "Lost"
    lose.play()
   
  }
 
  if(score == 100){
    gameState = "Win"
    winning.play()
    score = 98
  }


  if(keyDown(UP_ARROW)){
    player.y -= 5
  }

  if(keyDown(DOWN_ARROW)){
    player.y += 5
  }

  if(gameState ==="fight"){
    spawnZombies()
  }

  if(keyWentDown("space")){
  
    player.changeImage("shooter2")
   bullet = createSprite(player.x,player.y,20,10)
   bullet.velocityX = 10
   bulletGroup.add(bullet)
   bullets = bullets-1
   explosionSound.play()
    
  }
  else if(keyWentUp("space")){
    player.changeImage("shooter1")
  }
  
  if(bulletGroup.isTouching(zombieGroup)){
  
    for(i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play()
        score+= 2
      }
    }
  }

  if(zombieGroup.isTouching(player)){
    
    for(i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(player)){
        life -= 1
        lose.play()
        zombieGroup[i].destroy()
      }
    }
  }

  if(gameState == "Lost"){
    textSize(50)
    fill("Red")
    text("You Lost",700,400)
    zombieGroup.destroyEach()
    player.destroy()
  }
  
  if(gameState == "Win"){
    textSize(50)
    fill("Red")
    text("You Won",700,400)
    textSize(30)
    text("Your Score was:"+score,710,440)
    zombieGroup.destroyEach()
    player.destroy()
  }
 
  drawSprites()
  textSize(20)
  fill("White")
  text("Bullets: "+ bullets,windowWidth-150,100)
//text for score
textSize(20)
fill("White")
text("Score: "+ score,windowWidth-150,120)
//text for life
textSize(20)
fill("White")
text("Life: "+ life,windowWidth-150,140)



}

//function to spawn zombies
function spawnZombies(){
  if(frameCount % 60 === 0){
    zombie = createSprite(random(800,1000),random(100,500))
    zombie.addImage("zombie",zombieImg)
    zombie.scale = 0.2
    zombie.velocityX = -3

    zombieGroup.add(zombie)
  }
 
}
