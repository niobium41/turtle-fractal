var userDepth = 4;
var userAxiom = "F";
var userRuleFor = "F";
var userRule ="|[-F]|[+F]F";

var startX = 400;
var startY = 400;
var startDir = 0;
var angle = 10;
var segmentLength = 30;
var scaleIncr = 0.5;
var angleInc=0.1;

function setup() {
  // put setup code here
  //noLoop();
  var myCanvas = createCanvas(800,800);
  myCanvas.parent("canvasDiv");
  angleMode(DEGREES);
  colorMode(HSB,100);

}

function draw() {
  changeSettings();
  bart=new Turtle();
  background(255);
  if (angle>360){
    angleInc = -angleInc;
  }
  angle +=angleInc;
 interpret(axiomToArray(userAxiom),ruleToArray(userRuleFor,userRule),userDepth);
}

function changeSettings(){
  userDepth = document.getElementById("depth").value;
  userAxiom = document.getElementById("axiom").value;
  userRuleFor = document.getElementById("ruleFor").value;;
  userRule =document.getElementById("rule").value;

  //var startX = 20;
  //var startY = 380;
  //var startDir = 0;
  //angle = document.getElementById("angle").value;
  segmentLength = document.getElementById("userLength").value;
  scaleIncr = document.getElementById("incr").value/100.0;
  //var scaleIncr = 0.5;
}

function axiomToArray(axiom){
  var arr = [];
  for (let c of axiom){
    arr.push(c);
  }
  return arr;
}

function ruleToArray(thing,rule){
  var arr = [thing,[]];
  for (let c of rule){
    arr[1].push(c);
  }
  return arr;
}

function interpret(axiom,rule,depth){

    for (let el = 0; el<axiom.length; el++){
      switch(axiom[el]){
        case "[":
          bart.savePos();
          break;
        case "]":
          bart.loadPos();
          break;
        case "F":
          if (depth > 0){
            interpret(rule[1],rule,depth-1);
          }else{

            bart.draw();
          }
            break;
        case "|":
          //stroke(0);
          bart.scaleDraw(depth);
          break;
        case "+":
          stroke(0,0,255);
          bart.turnRight();
          break;
        case "-":
          stroke(255,0,0);
          bart.turnLeft();
          break;
        default:
          console.log("unidentified thingy")
      }

    }

}



function Turtle(){
  this.x = startX;
  this.y = startY;
  this.dir = startDir;

  this.angle = angle;
  this.incr = segmentLength;
  this.scaleIncr = scaleIncr;
  this.savedPos = [];

  this.walk = function(incr){
    this.x += incr*cos(this.dir);
    this.y += incr*sin(this.dir);
    //ellipse(this.x,this.y,10,10);
  }

   this.draw = function(){
     var oldX = this.x;
     var oldY = this.y;
     this.walk(this.incr);
     stroke(0,100,70,50);
     strokeWeight(5);
     line(oldX,oldY,this.x,this.y);
   }

   this.scaleDraw = function(depth){
     var oldX = this.x;
     var oldY = this.y;
     this.incr = pow(this.scaleIncr,userDepth-depth)*segmentLength;
     this.walk(this.incr);
     stroke(map(depth,0,userDepth,0,100),100,70,50);
     line(oldX,oldY,this.x,this.y);
   }

  this.turnRight = function(){
    this.dir -= -this.angle;

  }

  this.turnLeft = function(){
    this.dir -= this.angle;

  }

  this.savePos = function(){
    this.savedPos.push({x:this.x,y:this.y,dir:this.dir});
  }

  this.loadPos = function(){
    var pos = this.savedPos.pop();
    this.x = pos.x;
    this.y = pos.y;
    this.dir = pos.dir;
  }

}
