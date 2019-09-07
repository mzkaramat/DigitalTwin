// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected

  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    console.log(pose)
  }
    /*
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    console.log(pose.keypoints.filter(function (el) {
  return el.part == "leftShoulder" ;
})[0].position);
  }
  */
}
