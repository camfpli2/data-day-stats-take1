var butColor=[210,225,225];
//var butColor=[0];

var selectedbutColor=[255,185,195];

var wdth;                                 //browser width and height
var hgt;
var datalist;
var xmin;
var xmax;
var xint=10;  //
var binWidth;
var freqs=[];
var data;
var dataset;
var datalist=[];
var sample;
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
var waitingCounter;
var boxplotSelected=false;
var whichColumn;  //variable that will be column to be loaded, diff for diff datasets
var whistleStemImage;
var nassauStemImage;
var tortillaStemImage;
var greenhouseStemImage;
var xLabelingThreshold;

function preload(){
}

function adjustImageDimensions(image){
    if((image.width>wdth-40)||(image.height>hgt-130)){      //too tall or too wide
      if(image.width/(wdth-40)>image.height/(hgt-130)){    //%wise, wider than taller
         image.resize(wdth-40,0);
      }
      else{                                               //%wise, taller than wider
         image.resize(0,hgt-130);
      }
    }
}


function TortillaDiametersPage(){
    xLabelingThreshold=80;
    adjustImageDimensions(tortillaStemImage);
    background(240);
    controls=[];
    controls.push(new control(5,5,150,60,"Stem",true,butColor));
    controls[0].selected=true;
    controls.push(new control(175,5,150,60,"See/Edit Data",true,butColor));
    controls.push(new control(345,5,150,60,"Histogram",true,butColor));
    controls.push(new control(515,5,150,60,"Boxplot",true,butColor));
    controls.push(new control(685,5,150,60,"Mod Boxplot",true,butColor));
    controls.push(new control(1200,150,80,48,"DEC.",true,butColor));
    controls.push(new control(1300,150,80,48,"INC.",true,butColor));
    drawControls();
    image(tortillaStemImage,10,100);
}
function NassauCountyHomePricesPage(){
    xLabelingThreshold=160;
    background(240);
    controls=[];
    controls.push(new control(5,5,150,60,"Stem",true,butColor));
    controls[0].selected=true;
    controls.push(new control(175,5,150,60,"See/Edit Data",true,butColor));
    controls.push(new control(345,5,150,60,"Histogram",true,butColor));
    controls.push(new control(515,5,150,60,"Boxplot",true,butColor));
    controls.push(new control(685,5,150,60,"Mod Boxplot",true,butColor));
    controls.push(new control(1200,150,80,48,"DEC.",true,butColor));
    controls.push(new control(1300,150,80,48,"INC.",true,butColor));
    drawControls();
}

function whistlePricesPage() {
    xLabelingThreshold=75;
    adjustImageDimensions(whistleStemImage);
    background(240);
    controls=[];
    controls.push(new control(5,5,150,60,"Stem",true,butColor));
    controls[0].selected=true;
    controls.push(new control(175,5,150,60,"See/Edit Data",true,butColor));
    controls.push(new control(345,5,150,60,"Histogram",true,butColor));
    controls.push(new control(515,5,150,60,"Boxplot",true,butColor));
    controls.push(new control(685,5,150,60,"Mod Boxplot",true,butColor));
    controls.push(new control(1200,150,80,48,"DEC.",true,butColor));
    controls.push(new control(1300,150,80,48,"INC.",true,butColor));
    drawControls();
    image(whistleStemImage,10,100);
    
}

function homePage(){
    
    
}

function dataFilesPage(){     //pretty much chapter 1 home page
    whistleStemImage=loadImage("whistle-prices-stem.png");
    // nassauStemImage=loadImage();
    // greenhouseStemImage=loadImage();
    tortillaStemImage=loadImage("tortilla-diameters-stem.png");
    background(240);
    controls=[];
    controls.push(new control(20,120,400,72,"Tortilla Diameters",true,butColor));
    controls.push(new control(20,220,400,72,"Nassau County Home Prices",true,butColor));
    controls.push(new control(20,320,400,72,"Whistle Prices",true,butColor));
    controls.push(new control(20,420,400,72,"Greenhouse Gas Emissions",true,butColor));
    controls.push(new control(1200,150,80,48,"DEC.",true,butColor));
    controls.push(new control(1300,150,80,48,"INC.",true,butColor));
    drawControls();
    
}

function setup() {          //this function runs once upon startup
  wdth=windowWidth;
  hgt=windowHeight;
  createCanvas(1400, 800);
  background(240);
  // controls[0]=new control(5,5,160,72,"Home",true,butColor);
  // controls[1]=new control(170,5,160,72,"Enter New Data",true,butColor);
  // controls[2]=new control(1200,150,80,48,"DEC.",true,butColor);
  // controls[3]=new control(1300,150,80,48,"INC.",true,butColor);
  // dataset=data.getColumn(1);
  // var possTitle=isNumber(dataset[0]);
  // if (possTitle===false){
  //      dtitle = dataset.shift();
  // }

  // processData();  
  // calculateFiveNumber();
  // drawControls();
  // grouper();
  // getYScale();
  // axes();
  // histogram();
  // histogramSpecs();
  // boxplot();
    dataFilesPage();
}

function processData(){
    for(var g=0;g<dataset.length;g++){
        if(dataset[g]!==''){
            datalist.push(parseFloat(dataset[g]));
        }
    }
  datalist=sortListAscending(datalist);
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
  fill(255,90,100);
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
}


function histogram(){
  fill(140,200,200);
  for(z=0;z<numBars;z++){
    rect(150+z*(800/numBars),718-(yScale*freqs[z]),800/numBars,(yScale*freqs[z]));
  }
    if(boxplotSelected){boxplot();}
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
  stroke(0,30,200);
  rect(120,120,880,600);
  push();
  //translate(100,100);
  rotate( radians(270) );
  fill(230,10,10);
  text("FREQUENCY", -450,25);
  pop();
  strokeWeight(3);
  stroke(255,30,40);
  line(120,120,120,720);
  line(150,720,950,720);
  textSize(20);
  textAlign(RIGHT,CENTER);
  for(var d=0;d<=maxFreq;d++){
    if(d%whichLabels===0){ 
       fill(230,10,10);
       stroke(255,30,40);
       strokeWeight(1);
       line(115,718-d*yScale,125,718-d*yScale);
       noStroke();
       text(d,110,718-d*yScale);
    }
  }
  textAlign(CENTER,CENTER);
  text(dtitle,wdth/2-50,hgt-30);

  var counter=0;
  var xPixelTracker=0;
  var pixCounter=0;
  for(var g=150;g<=950;g+=(800/numBars)){  //labelling major grid values which start and end each histogram bin
    stroke(255,30,40);
    strokeWeight(2);
    if(numBars<=50){line(g,715,g,725);}

    noStroke();

    if(xPixelTracker>xLabelingThreshold||xPixelTracker===0){
        text(numberRight(xmin+counter*binWidth),g,740);
        if(numBars>50){    
            stroke(255,30,40);
            line(g,715,g,725);
        }
        xPixelTracker=0;
        pixCounter=0;
        }
    counter++;
    pixCounter++;  
    xPixelTracker+=(800/numBars);
  }
  for (var j=150;j<950;j+=(80/numBars)){     //10 minor grid lines between the labelled values
    stroke(255,30,40);
    strokeWeight(1);
    if(numBars<=30){line(j,715,j,725);}
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
      this.selected=false;
      
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
        histogramSpecs();
      }
      else if(this.txt==="INC."){
        numBars++;
        background(240);
        binWidth=((xmax-xmin)/numBars);      //INTERVAL of data values in each bin
        drawControls();
        grouper();
        getYScale();
        axes();
        histogram();
        histogramSpecs();
      }
     else if(this.txt==="Enter New Data"){
         dataset=[];
         editingScreen();
         
    }
    else if(this.txt==="Whistle Prices"){
        data=loadTable("Whistle_Price_Sample_and_Population.csv", "csv");
        whichColumn=0;
        whistlePricesPage();
    }
    else if(this.txt==="Nassau County Home Prices"){
        data=loadTable("Nassau_County_Home_Prices_2025.csv", "csv");
        whichColumn=0;
        NassauCountyHomePricesPage();
    }
    else if(this.txt==="Tortilla Diameters"){
        data=loadTable("Tortilla_Diameters_Production_Data.csv", "csv");
        whichColumn=1;
        TortillaDiametersPage();
    }
    else if(this.txt==="Boxplot"){
        boxplotSelected=true;
        this.selected=true;
        boxplot();
        drawControls();
    }
    else if(this.txt==="Histogram"&&this.selected===false){
        dataset=data.getColumn(whichColumn);
        var possTitle=isNumber(dataset[0]);
        if (possTitle===false){
           dtitle = dataset.shift();
         }
          background(240);
          controls[0].selected=false;
          this.selected=true;
          processData();  
          calculateFiveNumber();
          drawControls();
          grouper();
          getYScale();
          axes();
          histogram();
          histogramSpecs();
    }
  }
}
  
  drawit(){
    if(this.selected){fill(selectedbutColor)}
    else{fill(this.rgb);}
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
