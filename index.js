var videoPlayer = document.getElementById("player");
var container = document.getElementById("video-container");
var playButton = document.querySelectorAll(".play-control");
var volume = document.getElementById("volume");
var speed = document.getElementById("speed");
var track = document.getElementById("inner-track");
var skip = document.querySelectorAll(".skip");
var controls = document.getElementById("bottom");
var play = false;
var count = 0;

function playPause(e) {
    var playInterval;
    play = !play;
    if (play) {
        videoPlayer.play();
        playButton[1].classList.remove("hide");
        playButton[0].classList.add("hide");
        playInterval = setInterval(startTrack, 500);

    }
    else {
        videoPlayer.pause();
        playButton[0].classList.remove("hide");
        playButton[1].classList.add("hide");
        clearInterval(playInterval);
    }
}

function changeVol() {
    var val = Number(this.value);
    videoPlayer.volume = val / 100;
}

function changeSpeed() {
    var val = Number(this.value);
    videoPlayer.playbackRate = val / 100;
}

function skipTime(e) {
    if (e.target.classList.contains("fa-step-backward")) {
        if (videoPlayer.currentTime !== 0) {
            videoPlayer.currentTime = videoPlayer.currentTime - 10;
        }
    }
    else {
        videoPlayer.currentTime = videoPlayer.currentTime + 25;
    }
}

function startTrack() {
    var duration = videoPlayer.duration;
    var currentTime = videoPlayer.currentTime;
    var width = Math.floor((currentTime / duration) * 100);
    track.style.width = width + "%";
}

function showControls(e) {
    if (e.type === "mouseover") {
        controls.style.display = "initial";
    }
    else {
        if (play) {
            controls.style.display = "none";
        }
    }
}

//Event Listeners
videoPlayer.addEventListener("click", playPause);
videoPlayer.addEventListener("play", startTrack);
container.addEventListener("mouseover", showControls);
container.addEventListener("mouseleave", showControls);
volume.addEventListener("input", changeVol);
speed.addEventListener("input", changeSpeed);

//Add Event Listeners to play and pause icons
playButton.forEach(function(ele) {
    ele.addEventListener("click", playPause)
});

//Add Event Listeners to skip icons
skip.forEach(function(ele) {
    ele.addEventListener("click", skipTime)
});
