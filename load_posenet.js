let video;
let poseNet;
let poses = [];

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
  
  function modelReady(){
}