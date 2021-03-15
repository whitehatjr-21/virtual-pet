var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("dog.png");
   dogImg1=loadImage("dog1.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(25);
  textSize(20); 
}


function draw() {
  background("black");
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
  if(keyWentUp(UP_ARROW)){
    
    dog.addImage(dogImg);
  }
  if(foodS == 0){
  
    dog.addImage(dogImg);
    foodS = 25;
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text(" UP ARROW TO FEED",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
}


function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}