const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var thunder, thunder1,thunder2,thunder3,thunder4;
var batAnimation,bat;
var drops = [];

var engine, world;

var rand;

var maxDrops = 100;

var thunderCreatedFrame=0;


function preload(){
    thunder1 = loadImage("sprites/thunderbolt/1.png");
    thunder2 = loadImage("sprites/thunderbolt/2.png");
    thunder3 = loadImage("sprites/thunderbolt/3.png");
    thunder4 = loadImage("sprites/thunderbolt/4.png");

    batAnimation = loadAnimation("sprites/bat/bat1.png","sprites/bat/bat2.png","sprites/bat/bat3.png",
                                 "sprites/bat/bat4.png","sprites/bat/bat5.png","sprites/bat/bat6.png",
                                 "sprites/bat/bat7.png","sprites/bat/bat8.png","sprites/bat/bat9.png",
                                 "sprites/bat/bat10.png","sprites/bat/bat11.png","sprites/bat/bat12.png");
   
}

function setup(){
    engine = Engine.create();
    world = engine.world;

    createCanvas(400,700);
    umbrella = new Umbrella(200,500);

    //criando gotas

    for(var i=0; i<maxDrops; i++){
        drops.push(new Drops(random(0,400), random(0,400)));
    }
}

function draw(){
    Engine.update(engine);
    background(0); 

    //criando trovão
    rand = Math.round(random(1,4));
    if(frameCount%80===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(10,370), random(10,30), 10, 10);
        switch(rand){
            case 1: thunder.addImage(thunder1);
            break;
            case 2: thunder.addImage(thunder2);
            break; 
            case 3: thunder.addImage(thunder3);
            break;
            case 4: thunder.addImage(thunder4);
            break;
            default: break;
        }
        thunder.scale = random(0.3,0.6)
    }
    bat= createSprite(Math.round(random(0,400)),Math.round(random(0,400)));
    bat.addAnimation("moving_bat",batAnimation);
    bat.visible = false;
    if(frameCount % 100 === 0){
       bat.visible = true;
        bat.velocityX = Math.round(random(-4,4));
        bat.velocityY = Math.round(random(-4,4));
        bat.scale=0.4;
        
       
    }
    

    if(thunderCreatedFrame + 10 ===frameCount && thunder){
        thunder.destroy();
    }

    umbrella.display();

    //exibindo gotas de chuva

    for(var i = 0; i< drops.length; i++){
        drops[i].display();
        drops[i].update();
    } 
    
    drawSprites();
}   

