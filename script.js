var butColor=[210,225,225];
var datalist;
var xmin;
var xmax;
var xint=10;  //
var binWidth;
var freqs=[];
var data;
var dataset;
var fiveNumberSummary=[];
var numBars=10;
var xScale;
var yScale;
var maxFreq;
var controls=[];
var upperCuttoffs;
var dtitle;
var whichLabels;
var whichXLabels;
//var whichTicks;

function preload(){
    //data = loadTable("1ex60beans.csv", "csv");
   // data = loadTable("greenhouse-gas-emissions.csv", "csv");
   //data=loadTable("Nassau_County_Home_Prices_2025.csv", "csv");
    data=loadTable("Tortilla_Diameters_Production_Data.csv", "csv");
}



function setup() {          //this function runs once upon startup
  createCanvas(1400, 800);
  background(240);
  controls[0]=new control(5,5,160,72,"Home",true,butColor);
  controls[1]=new control(170,5,160,72,"Enter New Data",true,butColor);
  controls[2]=new control(1200,150,80,48,"DEC.",true,butColor);
  controls[3]=new control(1300,150,80,48,"INC.",true,butColor);
  dataset=data.getColumn(1);
  var possTitle=isNumber(dataset[0]);
  if (possTitle===false){
       dtitle = dataset.shift();
  }
  processData();  
  calculateFiveNumber();
  drawControls();
  grouper();
  getYScale();
  axes();
  histogram();
  boxplot();
  histogramSpecs();
  
}

function processData(){
  datalist=sortListAscending(dataset);
  sample=datalist.map(parseFloat);
  xmin=floor(datalist[0]);                  //integer value thats lower than data's min
  xmax=ceil(datalist[datalist.length-1]);    //integer value.  
  binWidth=((xmax-xmin)/numBars);      //INTERVAL of data values in each bin
}

function isNumber(variable) {
  return typeof variable === 'number' && !isNaN(variable) && Number.isFinite(variable);
}

function histogramSpecs(){
  textAlign(LEFT,TOP);
  fill(255,90,1000);
  noStroke();
  textSize(30);
  text("Bars: "+numBars,1050,150);
}

function boxplot(){
  fill(250);
  var minpx=map(sample[0],xmin,xmax,150,950);
  var maxpx=map(sample[sample.length-1],xmin,xmax,150,950);
  var q1px=map(fiveNumberSummary[1],xmin,xmax,150,950);
  var medpx=map(fiveNumberSummary[2],xmin,xmax,150,950);
  var q3px=map(fiveNumberSummary[3],xmin,xmax,150,950);
  stroke(110,230,110);
  strokeWeight(5);
  rect(q1px,155,(q3px-q1px),40);
  line(minpx,175,q1px,175);
  line(maxpx,175,q3px,175);
  line(medpx,155,medpx,195);
  
}

function calculateFiveNumber(){
  var medi; var q1; var q3;
  var n=datalist.length;
  if(n%2===0){   //  n is even
    medi=(sample[n/2-1]+sample[n/2])/2;
    
    if((n/2)%2===0){      //      upper and lower half has even n
      q1=(sample[(n/4)-1]+sample[(n/4)])/2;
      q3=(sample[(n/2)+(n/4)-1]+sample[(n/2)+(n/4)])/2;
    }
    else{              //upper and lower half has odd n
      var inc=(n/2+1)/2;
      q1=sample[inc-1];
      q3=sample[(n/2)+inc-1];
    }
  }
  else{    //  n is odd
    medi=sample[(n+1)/2-1];
    
    if(((n-1)/2)%2===0){      //upper and lower half even n
      q1=(sample[(n-1)/4-1]+sample[(n-1)/4])/2;
      q3=(sample[(n+1)/2+(n-1)/4-1]+sample[(n+1)/2+(n-1)/4])/2;
    }
    else{       //upper and lower half odd n
      q1=sample[(n+1)/4-1];
      q3=sample[(n+1)/2+(n+1)/4-1];
    }
  }
  fiveNumberSummary[0]=sample[0];
  fiveNumberSummary[1]=q1;
  fiveNumberSummary[2]=medi;
  fiveNumberSummary[3]=q3;
  fiveNumberSummary[4]=sample[sample.length-1];
}

function drawControls(){
  for (var j=0;j<controls.length;j++){
    controls[j].drawit();
  }
}

function sortListAscending(inputList) {
  // Use the Array.sort method to sort the array in ascending order
  const sortedList = inputList.slice().sort((a, b) => a - b);
  return sortedList;
}

function numberRight(n){
  const number = n;

// Using default formatting (based on user's locale)
const formattedNumberDefault = number.toLocaleString();

// Specifying a specific locale (e.g., en-US)
const formattedNumberUS = number.toLocaleString('en-US');

// Specifying options for formatting
const options = {
  style: 'decimal',  // Other options: 'currency', 'percent', etc.
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
};
const formattedWithOptions = number.toLocaleString('en-US', options);
return formattedWithOptions; // Output: "1,234,567.89"
}

function getYScale(){
  maxFreq=0;
  for(var j=0;j<freqs.length;j++){
    if (freqs[j]>maxFreq){
      maxFreq=freqs[j];
    }
  }
  xScale=(1);
  yScale=(500/maxFreq);   //number of pixels that will represent a freqency of 1.
   if(yScale>=25){whichLabels=1;}   //whichLabels will be the aritmetic seq d for the indexes to be labelled
   else {whichLabels=ceil(25/yScale);}



   //if(yScale>=2){whichTicks=1;}   //whichTicks will be the aritmetic seq d for the indexes to be hashed
   //else{whichTicks=ceil(4/yScale);}
}


function histogram(){
  fill(140,200,200);
  for(z=0;z<numBars;z++){
    rect(150+z*(800/numBars),718-(yScale*freqs[z]),800/numBars,(yScale*freqs[z]));
  }  
}


function grouper(){
  upperCuttoffs=[];
  freqs=[];
  var number=floor((xmax-xmin)/binWidth);
  for(var p=0;p<number;p++){
    freqs.push(0);
    upperCuttoffs[p]=xmin+(p+1)*binWidth;
  }
  
  for(var a=0;a<sample.length;a++){
    for(var b=0;b<upperCuttoffs.length;b++){
      if(sample[a]<upperCuttoffs[b]){freqs[b]++;break;}
    }
  }

  
  
  
  
  
}




function axes(){
  fill(250);
  rect(120,120,880,600);
  
  fill(230,10,10);
  strokeWeight(4);
  stroke(255,30,40);
  line(120,120,120,720);
  line(150,720,950,720);
  textSize(20);
  textAlign(RIGHT,CENTER);
  for(var d=0;d<=maxFreq;d++){
    // if(d%whichTicks===0){
    //    stroke(255,30,40);
    //    strokeWeight(1);
    //    line(115,718-d*yScale,125,718-d*yScale);
    // }
    if(d%whichLabels===0){  
       strokeWeight(2);
       line(115,718-d*yScale,125,718-d*yScale);
       noStroke();
       text(d,110,718-d*yScale);
    }
  }
  textAlign(CENTER,CENTER);

  var counter=0;
  var xPixelTracker=0;
  var pixCounter=0;
  for(var g=150;g<=950;g+=(800/numBars)){  //labelling major grid values which start and end each histogram bin
    stroke(255,30,40);
    strokeWeight(2);
    line(g,715,g,725);
    noStroke();
    if(xPixelTracker>125){
        text(numberRight(xmin+counter*binWidth),g,740);
        xPixelTracker=0;
        pixCounter=0;
        }
    counter++;
    pixCounter++;  
    xPixelTracker+=pixCounter*(800/numBars);
  }
  for (var j=150;j<950;j+=(80/numBars)){     //10 minor grid lines between the labelled values
    stroke(255,30,40);
    strokeWeight(1);
    //line(j,715,j,725);
  }


}

function avga(list){
  var runsum=0;
  for(var n=0;n<list.length;n++){
    runsum+=list[n];
  }
  return runsum/list.length;
}


function editingScreen(){
    background(240);
    fill(250);
    rect(120,120,880,600);
  
  strokeWeight(4);
  stroke(255,30,40);
  line(120,120,120,720);
  line(150,720,950,720);
  textSize(20);
    drawControls();
}













function touchStarted() {
  for(var p=0;p<controls.length;p++){
      controls[p].tapit();
  }
}

function touchEnded() {

}

function keyTyped() {     //this function will run anytime the user types any key
  if (key === 'o'){

  }
  else if (key === 'f'){

  }
// more else if's if you want to keep going
  
}




class control{
  constructor(x,y,w,h,txt,there, rgb){
    this.x=x; this.y=y; this.w=w; this.h=h; this.txt=txt; this.there=there; this.rgb=rgb;
  }
  
  tapit(){
    if(mouseX>=this.x && mouseX<=this.x+this.w && mouseY>=this.y && mouseY <= this.y+this.h){
      if(this.txt==="DEC."){
        numBars--;
        background(240);
        binWidth=((xmax-xmin)/numBars);      //INTERVAL of data values in each bin
        drawControls();
        grouper();
        getYScale();
        axes();
        histogram();
        boxplot();
        histogramSpecs();
      }
      else if(this.txt==="INC."){
        numBars++;
        console.log(numBars);
        background(240);
        binWidth=((xmax-xmin)/numBars);      //INTERVAL of data values in each bin
        drawControls();
        grouper();
        getYScale();
        axes();
        histogram();
        boxplot();
        histogramSpecs();
      }
     else if(this.txt==="Enter New Data"){
         dataset=[];
         editingScreen();
         
    }
  }
}
  
  drawit(){
    fill(this.rgb);
    strokeWeight(1);
    stroke(255,30,40);
    rect(this.x, this.y, this.w, this.h, 4);
    fill(0,0,200);
     noStroke();
    textSize(20)
    textAlign(CENTER,CENTER);
    text(this.txt,this.x+this.w/2, this.y+this.h/2)
    
  }
}
