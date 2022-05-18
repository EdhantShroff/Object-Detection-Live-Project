objects = [];
Status = "";
img = "";
song = "";

function setup(){
    canvas = createCanvas(640,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectdetector = ml5.objectDetector("cocossd",modelloaded);
}

function modelloaded(){
    console.log("Model is working neat and fine");
    Status = true;
}

function gotresults(error,results){
    if (error){
        console.log(error);
    }
    else {
      console.log(results);
      objects = results;
    }
}

function preload(){
    song = loadSound("z_alert.mp3");
}

function draw(){
    image(video,0,0,640,380);
   
    if (Status != "") {
        objectdetector.detect(video,gotresults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++){
            
           
            document.getElementById("number_of_objects").innerHTML = "Number of Objects - " + objects.length;
            fill(r,g,b);
            noFill();
            stroke(r,g,b);
            text(objects[i].label + " " + floor(objects[i].confidence * 100) + "%",objects[i].x + 10,objects[i].y + 10);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Baby Found";
                song.stop();
            }
            else {
               document.getElementById("status").innerHTML = "Baby not Found";
               song.play()
            }

            if (objects.length < 0) {
                document.getElementById("status").innerHTML = "Baby not Found";
               song.play()
            }
        }
    }
    
}

