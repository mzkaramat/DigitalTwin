let video;
let poseNet;
let poses = [];
var  gif_loadImg, gif_createImg, prevPoint;

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('videoContainer');
  prevPoint = {
    position: {
      x: 0,
      y: 0
  }
}
  // Video capture
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  
  // Hide the video element, and just show the canvas
  video.hide();

  gif_loadImg = loadImage("heart.gif");
  brain_img = loadImage("brainFront.png");
  kidneys_img= loadImage("kidneys.png");

  //gif_createImg = createImg("heart.gif").size(100, 120);
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  //drawSkeleton();
}

function modelReady(){
  //select('#status').html('model Loaded')
}

function calDistance(first, second){
    return Math.pow((Math.pow((first.x - second.x), 2) + Math.pow((first.y - second.y), 2)), 0.5)
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {

  // For each pose detected, loop through all the keypoints
  let pose = poses[i].pose;
  let leftShoulder = getVal("leftShoulder", pose);
  let rightShoulder = getVal("rightShoulder", pose);
  let rightHip = getVal("rightHip", pose);
  let nose = getVal("nose", pose);
  let rightWrist = getVal("rightWrist", pose);

  let scale = calDistance(leftShoulder.position, rightShoulder.position)/ 3
    
  image(brain_img, nose.position.x - scale, nose.position.y - scale*1.8, scale* 2,scale * 2);
  image(gif_loadImg, leftShoulder.position.x - scale*0.7, leftShoulder.position.y - 10, scale, scale * 1.2);
  image(kidneys_img, rightHip.position.x + scale*0.1, rightHip.position.y - scale, scale * 2, scale * 2.4);
  prevPoint = leftShoulder;
  console.log(prevPoint);

    //image(brain_img, nose.position.x - 80, nose.position.y - 200,180, 180);


  }
}

function getVal(val, pose) {
  let new_points = pose.keypoints.filter(function (el) {
          return el.part == val ;
    })[0];
  if (prevPoint[val] == undefined || (calDistance(prevPoint[val].position, new_points.position) > 15)) {
    prevPoint[val] = new_points
    return new_points
  }else {
    return prevPoint[val]
  }
}

// A function to draw the skeletons
function drawSkeleton() {

}