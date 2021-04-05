var ball;
var database,position

function preload(){
    bg = loadImage("cityImage.png");
    ballon = loadImage("HotAirBallon-03.png");
    
}
function setup(){
    database=firebase.database();
    createCanvas(1500,700);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage(ballon)
    ball.scale = 0.5
    

    var ballPosition=database.ref('ball/position');
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
    }
    drawSprites();
}

function writePosition(x,y){
   database.ref('ball/position').set({
       'x':position.x+x,
       'y':position.y+y
   })
}

function readPosition(data)
{
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
}

function showError()
{

 console.log("Error in the database");
}
