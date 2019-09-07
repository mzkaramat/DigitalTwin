let video;
let poseNet;
let poses = [];
var  heart_img, gif_createImg, prevPoint, brain_model, parts, scale;

function setup() {
  const canvas = createCanvas(window.innerHeight - 50, window.innerHeight);
  canvas.parent('videoContainer');
  prevPoint = []
  parts = []
  // Video capture
  video = createCapture(VIDEO);
  video.size(window.innerHeight - 50, window.innerHeight);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  
  // Hide the video element, and just show the canvas
  video.hide();

  heart_img = loadImage("heart.gif");
  brain_img = loadImage("brainFront.png");
  kidneys_img= loadImage("kidneys.png");
  // brain_model = loadModel("Brain_Model.obj")

  //gif_createImg = createImg("heart.gif").size(100, 120);
}

function draw() {
  image(video, 0, 0, window.innerHeight - 50, window.innerHeight);
  // model(brain_model);

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
    if (poses.length > 0) {
      update(poses, i)
      onMotion(poses)
    } 

  // For each pose detected, loop through all the keypoints
  let pose = poses[i].pose;
  let leftShoulder = getVal("leftShoulder", pose, i);
  let rightShoulder = getVal("rightShoulder", pose, i);
  let rightHip = getVal("rightHip", pose, i);
  let nose = getVal("nose", pose, i);
  let rightWrist = getVal("rightWrist", pose, i);

  scale = calDistance(leftShoulder.position, rightShoulder.position)/ 3
  tint(255, 127);  
  image(brain_img, parts[0].x, parts[0].y, scale* 1.8,scale * 1.5);
  image(heart_img, parts[1].x, parts[1].y, scale, scale * 1.2);
  image(kidneys_img, rightHip.position.x + scale*0.1, rightHip.position.y - scale, scale * 2, scale * 2.4);
  tint(255, 255);  
  // console.log(prevPoint);

    //image(brain_img, nose.position.x - 80, nose.position.y - 200,180, 180);

  }
}

function update(poses, cnt){
  //
  let noseCordinate = getVal("nose", poses[cnt].pose, cnt)
  parts[0] = {
    x: noseCordinate.position.x - scale, 
    y: noseCordinate.position.y - scale*1.8,
    part: "Brain"
  }
  let leftShoulderCordinate = getVal("leftShoulder", poses[0].pose, 0)
  parts[1] = {
    x: leftShoulderCordinate.position.x - scale*0.7, 
    y: leftShoulderCordinate.position.y - scale*0.1,
    part: "Heart"
  }
}

function onMotion(poses){
  rightWrist = poses[0].pose.rightWrist
  for (let i = 0; i < parts.length; i++) {
    if (calDistance(parts[i], rightWrist) < 150)
    {
      console.log(parts[i].part)
    }
  }
}

function getVal(val, pose, cnt) {
  let new_points = pose.keypoints.filter(function (el) {
          return el.part == val ;
    })[0];
  if (new_points.score < 0.5 && prevPoint[cnt + val] != undefined) {
    return prevPoint[cnt + val]
  }
  if (prevPoint[cnt + val] == undefined || (calDistance(prevPoint[cnt + val].position, new_points.position) > 50 )) {
    prevPoint[cnt + val] = new_points
    return new_points
  }else {
    return prevPoint[cnt + val]
  }
}

// A function to draw the skeletons
function drawSkeleton() {

}