objects = [];
status = "";
video = "";

function preload()
{
     video = createVideo('video.mp4')
}

function setUp()
{
    canvas =  createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start()
{
    objectDetecter = ml5.objectDetecter('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status :Detecting objects"; 
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, result)
{
   if(error)
   {
    console.log(error);
   }
   console.log(result);
   objects = results;
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status !=="")
    {
           objectDetecter.detect(video, gotResult);

    for(i = 0; i < objects.lenght; i++)
    {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected Are : " + objects.lenght;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(object[i].label + " " + percent + "%" + objects[i].x + 15 + objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x , objects[i].y , objects[i].width ,objects[i].height);
    }
  }
}