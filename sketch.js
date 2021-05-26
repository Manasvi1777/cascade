const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine, world, body;
var bg, player,forms,rules;
var gameState = "FORM";
var characterState = "ROOK"
var timer = 10000; 
var timer2,x,y,end_image,lost_image;

function preload() {
 
  
  bg= loadImage("bg.jpeg");
  bishop = loadImage("11 (1).png");
  rook = loadImage("9 (1).png");
  knight = loadImage("10 (1).png");
  queen = loadImage("0(1).png");
 
 
}

function setup() {
  createCanvas(600,600);

  form = new Form();
  engine=Engine.create();
  world=engine.world;
  rules = new Rule();

  timer2 = new Timer();
  player = new Player(540,510,50,80);
  changeCharacter();
}

function draw() 
{
  background(bg);
  if (player.body.position.x>76){
    gameState="END"
  }

  if (gameState==="FORM"){
    form.display();
  }
  if (gameState==="RULE"){
    rules.display();
  }
  if (timer<=0){
    gameOver();
  }
  if (gameState==="PLAY"){
    Engine.update(engine);
    engine.world.gravity.y=0;
    form.greeting.hide();
    keyCheck();
    inBlackTile();

    timer2.display();
    if (mouseIsPressed){
      x=mouseX;
      y=mouseY;
      console.log(x,y);
    }
      if (inBlackTile()){
        Matter.Body.setPosition(player.body,{x:540, y:510})
      }
    player.display();
  }
  if (gameState==="END"){
    endFunction();
  }
  drawSprites();
}



function inBlackTile(){
  x = player.body.position.x;
  y = player.body.position.y;
  if((x>=299 && x<=375 && y>=78 && y<=151) || 
  (x>=71 && x<=148 && y>=154 && y<=225) || 
  (x>=527 && x<=600 && y>=300 && y<=376)|| 
  (x>=0 && x<=73 && y>=379 && y<=452) || 
  (x>=375 && x<=448 && y>=452 && y<=527)|| 
  (x>=149 && x<=223 && y>=530 && y<=600)) 
    {
     return true; 
    } else 
    { 
      return false; 
    }
}
function changeCharacter(){
  var rand = Math.round(random(1,4));
  switch (rand){
    case 1 : characterState="ROOK"
    break
    case 2 : characterState="BISHOP"
    break
    case 3 : characterState="QUEEN"
    break
    case 4 : characterState="KNIGHT"
    break 
    default:    
    break
  }
}
function keyCheck(){
  pos = player.body.position;
  if (characterState!=="KNGIHT"){
  if (keyDown("left")&&keyDown("up")&&characterState!=="ROOK"&& player.body.position.x>=147 && player.body.position.y>=152 && player.body.speed<0.1){
    Matter.Body.setPosition(player.body, {x: pos.x-73,y: pos.y-73});
  } else
  if (keyDown("right")&&keyDown("up")&&characterState!=="ROOK"&& player.body.position.x<=449 && player.body.position.y>=152 && player.body.speed<0.1){
    Matter.Body.setPosition(player. body, {x: pos.x+73,y:pos.y-73});
  } else
  if (keyDown("left")&&keyDown("down")&&characterState!=="ROOK"&& player.body.position.x>=147 && player.body.position.y<=451 && player.body.speed<0.1){
    Matter.Body.setPosition(player.body, {x: pos.x-73,y: pos.y+73});
  } else
  if (keyDown("right")&&keyDown("down")&&characterState!=="ROOK"&& player.body.position.x<=449 && player.body.position.y<=451 && player.body.speed<0.1){
    Matter.Body.setPosition(player.body, {x: pos.x+73,y: pos.y+73});
  } else
  if (keyDown("left")&&characterState!=="BISHOP"&& player.body.position.x>=147 && player.body.speed<0.1){
    Matter.Body.setPosition(player.body, {x: pos.x-96,y: pos.y});
  } else
  if (keyDown("right")&&characterState!=="BISHOP"&& player.body.position.x<=449 && player.body.speed<0.1){
    Matter.Body.setPosition(player.body, {x: pos.x+96,y: pos.y});
  } else
  if (keyDown("up")&&characterState!=="BISHOP"&& player.body.position.x>=152 && player.body.speed<0.1){
    Matter.Body.setPosition(player.body, {x: pos.x,y: pos.y-182});
  } else
  if (keyDown("down")&&characterState!=="BISHOP"&& player.body.position.y<=451 && player.body.speed<0.1){
    Matter.Body.setPosition(player.body, {x: pos.x,y: pos.y+182});
  }
}
else if (characterState==="KNIGHT"){
  //do it
}
}
function endFunction(){
  end_image = loadImage("You_won.png");
  end_image.visible=true;
}
function gameOver(){
  lost_image = loadImage("You_lost.png");
}