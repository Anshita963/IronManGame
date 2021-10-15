var IronMan,IronManImage;
var bg, bgImage;
var StoneGroup,StoneImage;
var Spikes,SpikesImage;
var Diamonds,DiamondImage ;
var DiamondScore=0;
var restart,restartImg;
var gameState="PLAY";
var ground;
function preload(){
  IronManImage=  loadImage("images/iron.png");
  bgImage = loadImage("images/bg.jpg");
 StoneImage = loadImage("images/stone.png");
DiamondImage = loadImage("images/diamond.png");
SpikesImage = loadImage("images/spikes.png");
 
restartImg = loadImage("images/restart.png");

}

function setup() {
  createCanvas(1000, 600);

  //create background sprite
  bg = createSprite(500,300);
  bg.addImage(bgImage);
  bg.scale =1;
  

  //create  IronMan sprite
  IronMan = createSprite(290,505,20,50);
  IronMan.addImage(IronManImage);
 

  //create ground sprite
  ground = createSprite(200,585,400,10);
  ground.visible = false;

  //create groups
  Spikes = new Group();
 StoneGroup = new Group();
  Diamonds = new Group();

  restart = createSprite(600,300);
  restart.addImage(restartImg);
  restart.visible=false;
}

function draw() {
 
  if (gameState==="PLAY"){
   IronMan.setCollider("rectangle",0,0,300,500);
    IronMan.scale =0.3;
    bg.velocityY = -6;
   //scroll background 
  if (bg.y < 100){
    bg.y=bg.width/4;
  }
  //prevent  IronMa moving out 
  if(IronMan.y<100){
   IronMan.y=100;
  }
  if(IronMan.y<-100){
    IronMan.y=-100;
   }
 //prevent IronMan moving out from top
 if(IronMan.x<50){
  IronMan.x=50;
 }
 if(IronMan.x<-200){
   IronMan.x=-200;
  }
//jump with arrow keys 
  if(keyDown("up")) {
   IronMan.velocityY = -16;}
   if(keyDown("left" ) ){
    IronMan.velocityX = -16;}
    if(keyDown("right" ) ){
      IronMan.velocityX = 16;
  }
  //gravity
  IronMan.velocityY = IronMan.velocityY + 0.5;
 
 
  generateStones();

  //Make  IronMan step(collide) on stones 
  for(var i = 0 ; i< (StoneGroup).length ;i++){
    var temp = (StoneGroup).get(i) ;
    
    if (temp.isTouching(IronMan)) {
       IronMan.collide(temp);
      }     
    }

    //call the function to generate Diamonds
    generateDiamonds();

    //Make  IronMan catch the Diamonds
    for(var i = 0 ; i< (Diamonds).length ;i++){
      var temp = (Diamonds).get(i) ;
      
      if (temp.isTouching(IronMan)) {
        
        //increase score when Diamonds is caught
        DiamondScore++;
        //destroy Diamonds once it is caught
        temp.destroy();
        temp=null;
        }
          
      }
     
      //call the function to generate spikes
      generateSpikes();
      
      if(Spikes.isTouching(IronMan)){
        DiamondScore = DiamondScore-5;
       }

          
  
  if(mousePressedOver(restart)){
    restartGame(); 
   }
    
   
    //prevent ironman from falling down due to gravity
    IronMan.collide(ground);

  //draw sprites on screen
  drawSprites();
  textSize(20);
  fill("brown");
  //display score
  text("Diamonds Collected: "+ DiamondScore,500,50);
  
}


function generateStones() {
  if (frameCount % 70 === 0) {
    var stone1 = createSprite(750,300,40,10);
    stone1.y = random(80,500);
    stone1.addImage(StoneImage);
    stone1.scale = 1;
    stone1.velocityY= -4;
   
    stone1.lifetime =200;
    StoneGroup.add(stone1);
  }
}

function generateDiamonds() {
  if (frameCount % 50 === 0) {
    var diamond1 = createSprite(825,300,40,10);
    diamond1.addImage(DiamondImage);
    diamond1.y = random(650,100);
    diamond1.scale = 0.8;
    diamond1.velocityX = -5;
    diamond1.lifetime = 130;
    Diamonds.add( diamond1 );
  }
}


function generateSpikes() {
  if(frameCount % 100 === 0) {
    var spike1 = createSprite(830,300,10,40);
    spike1.velocityX = -5;
    spike1.scale=1;
    spike1.y = random(600,100);
    spike1.addImage(SpikesImage);
    spike1.lifetime = 130;
    Spikes.add(spike1);
  }
}
}

