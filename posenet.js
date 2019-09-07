let video;
let poseNet;
let poses = [];
var gif_loadImg, gif_createImg, prevPoint;

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('videoContainer');

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
  let leftShoulder = pose.keypoints.filter(function (el) {
          return el.part == "leftShoulder" ;
        })[0];

  let rightShoulder = pose.keypoints.filter(function (el) {
          return el.part == "rightShoulder" ;
        })[0];

let rightHip = pose.keypoints.filter(function (el) {
          return el.part == "rightHip" ;
        })[0];


  let brain_pose = pose.keypoints.filter(function (el) {
          return el.part == "nose" ;
        })[0];

  let leftShoulder_img = pose.keypoints.filter(function (el) {
          return el.part == "rightWrist" ;
        })[0];

  let scale = calDistance(leftShoulder.position, rightShoulder.position)/ 3
    
    image(brain_img, brain_pose.position.x - 100, brain_pose.position.y - 180,scale* 2,scale * 2);
    image(gif_loadImg, leftShoulder.position.x - 70, leftShoulder.position.y - 10, scale, scale * 1.2);
    image(kidneys_img, rightHip.position.x + 10, rightHip.position.y - 100, scale * 2, scale * 2.4);

    //image(brain_img, brain_pose.position.x - 80, brain_pose.position.y - 200,180, 180);


    prevPoint = leftShoulder;

  }
}

// A function to draw the skeletons
function drawSkeleton() {

}