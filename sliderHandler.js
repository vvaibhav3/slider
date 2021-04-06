//data i.e all current available posts
const posts = ["i1.png", "i2.jpg", "i3.jpg", "video1.mp4", "video2.mp4"];
let postNo = 0; // pointer to next post
let videoDemon = null;
let changed = false;
let touchX=0,touchY=0,touchEndX=0,touchEndY=0;

console.log(navigator.userAgent);
if (
  navigator.userAgent.includes("Android") ||
  navigator.userAgent.includes("like Mac")
) {
  console.log("mobile-touching event"); 
  window.addEventListener("touchstart",function(event){
    touchX=event.screenX;
    touchY=event.screenY;
  });
  window.addEventListener("touchend",function(event){
    touchEndX=event.screenX;
    touchEndY=event.screenY;
    swipeDetector();
  });
} else {
  console.log("desktop-wheel scrolling"); 
  //for desktop if wheel is scrolled up-previous post and if scrolled down-next post
  window.addEventListener("wheel", directionDetector);
}

function swipeDetector(){
  if(touchEndY<touchY){
    console.log("swipe-down");
    postNo <= 0 ? (postNo = posts.length - 1) : postNo--; // decreament pointer to previous post if values is not negative
    nextPost(document.getElementById("slider-data"));
  }
  else if(touchEndY>touchY){
    console.log("swipe-up");
    postNo++; // increament pointer to next post
    nextPost(document.getElementById("slider-data"));
  }
}


function directionDetector(event) {
  console.log(event.wheelDelta);
  if (event.wheelDelta > 0) {
    postNo <= 0 ? (postNo = posts.length - 1) : postNo--; // decreament pointer to previous post if values is not negative
    nextPost(document.getElementById("slider-data"));
  } else {
    postNo++; // increament pointer to next post
    nextPost(document.getElementById("slider-data"));
  }
}

function isVideoEnded() {
  console.log("demon started.." + document.getElementById("video").ended);
  if (document.getElementById("video").ended || changed) {
    clearInterval(videoDemon);
    postNo++;
    nextPost(document.getElementById("slider-data"));
  }
}

function setChanged() {
  changed = true;
}

function nextPost(id) {
  //if previous demon is active then terminate for avoiding errors for non-video content
  if (videoDemon != null) clearInterval(videoDemon);

  let newPost = posts[postNo % posts.length]; // boundry checking

  //loading next post
  //if video
  if (newPost.includes(".mp4") || newPost.includes(".mkv")) {
    //getting video type
    let videoType = newPost.includes(".mp4") ? "video/mp4" : "video/mkv";
    id.innerHTML = `<video id="video" width="100%" height="100%" autoplay controls> 
                               <source src=${newPost} type=${videoType}>
                           </video>`;
    videoDemon = setInterval(isVideoEnded, 1000);
  } else {
    // if image
    id.innerHTML = `<img src=${newPost} alt='post' width='100%' height='100%'>`;
  }
  // console.log(e.target);
}
