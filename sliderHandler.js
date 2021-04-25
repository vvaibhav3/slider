//data i.e all current available posts
const posts = ["i1.png", "i2.jpg", "i3.jpg", "video1.mp4", "video2.mp4"];
let postNo = 0; // pointer to next post
let videoDemon = null;
let changed = false;
let touchX = 0,
  touchY = 0,
  touchEndX = 0,
  touchEndY = 0;

let left="34%";

console.log(navigator.userAgent);
if (
  navigator.userAgent.includes("Android") ||
  navigator.userAgent.includes("like Mac")
) {
  console.log("mobile-touching event");
  window.addEventListener(
    "touchstart",
    function (event) {
      touchX = event.touches[0].clientX;
      touchY = event.touches[0].clientY;
      event.preventDefault();
    },
    false
  );
  window.addEventListener("touchmove",function(event){
    event.preventDefault();
  },false);
  window.addEventListener(
    "touchend",
    function (event) {
      touchEndX = event.touches[0].clientX;
      touchEndY = event.touches[0].clientY;

      if (touchEndX == null) {
        return;
      }
      const newX = Math.abs(touchEndX - touchX);
      swipeDetector(newX);
      event.preventDefault();
    },
    false
  );
} else {
  console.log("desktop-wheel scrolling");
  //for desktop if wheel is scrolled up-previous post and if scrolled down-next post
  window.addEventListener("wheel", directionDetector, false);
  left="44%";
}

function swipeDetector(value) {
  if (value < 0) {
    console.log("swipe-left");
    postNo <= 0 ? (postNo = posts.length - 1) : postNo--; // decreament pointer to previous post if values is not negative
    nextPost(document.getElementById("slider-data"), "anmLeft");
  } else {
    console.log("swipe-right");
    postNo++; // increament pointer to next post
    nextPost(document.getElementById("slider-data"), "anmRight");
  }
}

function directionDetector(event) {
  console.log(event.wheelDelta);
  if (event.wheelDelta > 0) {
    postNo <= 0 ? (postNo = posts.length - 1) : postNo--; // decreament pointer to previous post if values is not negative
    nextPost(document.getElementById("slider-data"), "anmLeft");
  } else {
    postNo++; // increament pointer to next post
    nextPost(document.getElementById("slider-data"), "anmRight");
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

function nextPost(id, classNm) {
  //if previous demon is active then terminate for avoiding errors for non-video content
  if (videoDemon != null) clearInterval(videoDemon);

  let newPost = posts[postNo % posts.length]; // boundry checking

  //loading next post
  //if video
  if (newPost.includes(".mp4") || newPost.includes(".mkv")) {
    //getting video type
    let videoType = newPost.includes(".mp4") ? "video/mp4" : "video/mkv";
    id.innerHTML = `<video id="video" width="100%" height="100%" class="${classNm}" autoplay controls> 
                               <source src=${newPost} type=${videoType}>
                           </video>`;
    videoDemon = setInterval(isVideoEnded, 1000);
  } else {
    // if image
    id.innerHTML = `<img src=${newPost} alt='post' width='100%' height='100%' class="${classNm}" >`;
  }
  // console.log(e.target);
}

function expand() {
  let newStyle = `display:block;animation: expandButton 0.2s ease;animation-fill-mode: forwards;`;
  let oldStyle = document.getElementById("shareButton");
  oldStyle.style = newStyle;

  newStyle = `dispaly:inline-block;bottom:1.4%;width:200px;position:fixed;left:${left}`;

  document.getElementById("shareData").style = newStyle;
  console.log(oldStyle.style);
}

function closeButton() {
  document.getElementById("shareButton").style= "";
  document.getElementById("shareData").style = "display:none;";
  console.log(document.getElementById("shareButton").style);
}
