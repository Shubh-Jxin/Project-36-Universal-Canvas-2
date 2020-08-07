//making the global variables
var database;
var canvas;
//drawing will be an array of pathd
var drawing=[];

var colorArray=[];

//currentPath is the array of paths between the start and the end of one mouse press and release
var currentPath=[];


//var color;


var save, input;

var drawingState=0;

var point



function setup(){
    //creating the canvas
    canvas=createCanvas(800,600);

    //to start the path of the current path when mouse is pressed
    canvas.mousePressed(startPath);

    //to end the path of the current path when mouse is released
    canvas.mouseReleased(endPath);

    //database configuration
    database= firebase.database();

    //creating the tile using DOM in javascript
    title=createElement("h1");
    title.position(600,20);
    title.html("Universal Canvas");


    //save button
    save= createButton("Save");
    save.position(550,710);
    save.style("font-size:30px;");


    //input button
    input= createInput("Name");
    input.position(320,710);
    input.style("font-size:20px;");

    
    

    
}


//mouseDragged function to start the drawing
//to store the cooridinates of the mouseX and mouseY everytime mouseIsPressed in point object and 
//pushing it in the current path
function mouseDragged(){
    if(drawingState===1){
        point={
            x:mouseX,
            y:mouseY
        }

    }
        currentPath.push(point);

        
}   

function draw(){
    //background of the canvas
    background(255);
        


    //basis of drawings
    strokeWeight(5);
    noFill();
    stroke(0)
        //nested loops
        //first loop is looping through all the paths stored in the drawing and storing them in an array called path
        for(var j=0;j<drawing.length;j++){
         var path= drawing[j];
         
         //beginning the shape
         beginShape();
        //second loop is looping through the points stored in the path
         for(var i=0;i<path.length;i++){
             //creating a vertex at all the points
            vertex(path[i].x,path[i].y)
        }
        //ending the shape
        endShape();
        }

        //to save the drawing when the mouse is pressed
        save.mousePressed(saveDrawing);
}

        

//starting the path 
function startPath(){
    drawingState=1;
    //making the current path empty to make a new path
    currentPath=[];
    //pushing the paths in the drawing array
    //done in start path also because then the drawing was only visible when the mouse was released
    drawing.push(currentPath);
}

//ending the path
function endPath(){
    drawingState=0;
    //pushing the paths in the drawing array
    drawing.push(currentPath);
}


//function to save the drawing
function saveDrawing(){
    //referencing drawing data from the database
   var drawing_ref= database.ref("drawings");
    //meta data to be stored in the database
   var drawing_data={
       name: input.value(),
       drawing: drawing
   }

   //to push the metadata
   drawing_ref.push(drawing_data);
}





//this is a temporary feature
    // info=createElement("h3");
    // info.position(1120,55);
    // info.html("Choose a Color before you start drawing the entire drawing will be of that color then")

    // redButton=createButton("Red Color");
    // redButton.position(1200,150)
    
    // greenButton=createButton("Green Color");
    // greenButton.position(1200,200)

    // blueButton=createButton("Blue Color");
    // blueButton.position(1200,250)

    // blackButton=createButton("Black Color");
    // blackButton.position(1200,300)

    // yellowButton=createButton("Yellow Color");
    // yellowButton.position(1200,350)

    // pinkButton=createButton("Pink Color");
    // pinkButton.position(1200,400)

    // slider= createSlider(1,10,1);
    // slider.position(1200,600)

    // info2=createElement("h3");
    // info2.position(1150,500);
    // info2.html("You can also adjust the stroke weight using this slider (1-10)")

    //to change the color of the drawings
    // redButton.mousePressed(function(){
    //     color=color(255,0,0)
    //     stroke(color);
    //     colorArray.push(color)
    // })

    // greenButton.mousePressed(function(){
    //     color=color(0,255,0)
    //     stroke(color);
    //     colorArray.push(color)
    // })

    // blueButton.mousePressed(function(){
    //     color=color(0,0,255)
    //     stroke(color);
    //     colorArray.push(color)
    // })

    // blackButton.mousePressed(function(){
    //     color=color(0)
    //     stroke(color);
    //     colorArray.push(color)
    // })

    // yellowButton.mousePressed(function(){
    //     color=color('yellow')
    //     stroke(color);
    //     colorArray.push(color)
    // })

    // pinkButton.mousePressed(function(){
    //     color=color(255,192,203)
    //     stroke(color);
    //     colorArray.push(color)
    // })