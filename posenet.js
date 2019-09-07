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

  heart_img = loadGif("heart.gif");
  gif_loadImg = loadImage("heart.gif");
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

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {

  debugger
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {


    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let keypoint = pose.keypoints.filter(function (el) {
            return el.part == "leftShoulder" ;
          })[0];


    let keypoint = pose.keypoints.filter(function (el) {
            return el.part == "nose" ;
          })[0];
      

      //keypoint.position.y +=10;
      //keypoint.position.x -=10;
      // Only draw an ellipse is the pose probability is bigger than 0.2
      //gif_loadImg.position(keypoint.position.x, keypoint.position.y );
      image(gif_loadImg, keypoint.position.x - 70, keypoint.position.y - 10,100, 120);
      
  
    prevPoint = keypoint;


    /*
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
    */
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  /*for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
  */
}