const songs = [
  {
    songSrc: "/songs/sound/perfect.mp3",
    name: "perfect",
    songImg: "/songs/images/perfect.png",
    singer: "ed shereen",
  },
  {
    songSrc: "/songs/sound/9841 - Sajjan Raj Vaidya.mp3",
    name: "9841",
    songImg: "/songs/images/9841.png",
    singer: "sajjan raj vaidya",
  },
  {
    songSrc: "/songs/sound/Ishq Hai.mp3",
    name: "ishq hai",
    songImg: "/songs/images/ishq heyh.png",
    singer: "unkown",
  },
  {
    songSrc: "/songs/sound/Kaisa Yeh Junoon.mp3",
    name: "kaisa yeh junoon",
    songImg: "/songs/images/Kaisa Yeh Junoon.png",
    singer: "unkown",
  },
];

// DOM elements
const previousBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const songImg = document.querySelector("img");
const songAudio = document.querySelector("audio");
const playPause = document.querySelector("#play-pause i");
const loop = document.querySelector("#loop");
const like = document.querySelector(".love");
const timeline = document.querySelector(".timeline");
const shuffle = document.querySelector("#shuffle");
const songName = document.querySelector(".song-name");
const artistName = document.querySelector(".artist-name");

let songIndex = 0;
let play = true;
let liked = false;
let loopActive = false;

// Updates the audio and image sources and handles animation/play
function updateSong() {
  songAudio.src = songs[songIndex].songSrc;
  songImg.src = songs[songIndex].songImg;
  songName.textContent = songs[songIndex].name;
  artistName.textContent = songs[songIndex].singer;
  playPause.setAttribute("class", "fa-solid fa-pause");
  songImg.style.animation = "19s rotate360 infinite linear";
  songAudio.play();
  play = false;
  updateLikeUI();
}

//timeline function
function progress() {
  timeline.max = songAudio.duration;
  timeline.value = songAudio.currentTime;
}

let updateTimeline = setInterval(progress, 300);

let isSeeking = false;

timeline.addEventListener("input", () => {
  songAudio.currentTime = timeline.value;
});

// Updates the like button UI based on local storage
function updateLikeUI() {
  let localStorageLiked = localStorage.getItem(`liked${songIndex}`);
  const parsedLiked = JSON.parse(localStorageLiked);
  console.log(parsedLiked);
  if (parsedLiked && parsedLiked.songSrc === songs[songIndex].songSrc) {
    like.removeAttribute("class");
    like.setAttribute("class", "fa-solid fa-heart love");
    like.style.color = "red";
    like.style.fontSize = "18px";
    localStorage.setItem(`liked${songIndex}`, JSON.stringify(songs[songIndex]));
    liked = true;
  } else {
    like.removeAttribute("class");
    like.setAttribute("class", "fa-regular fa-heart love");
    like.style.color = "white";
    like.style.fontSize = "16px";
    liked = false;
  }
}

// Next song button
nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex == songs.length) {
    songIndex = 0;
  }
  updateSong();
});

// Previous song button
previousBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex == -1) {
    songIndex = songs.length - 1;
  }
  updateSong();
});

// Pause the song initially and stop animation
songAudio.pause();
songImg.style.animation = "none";

// Play/Pause toggle
playPause.addEventListener("click", () => {
  if (play == true) {
    playPause.setAttribute("class", "fa-solid fa-pause");
    songImg.style.animation = "19s rotate360 infinite linear";
    songAudio.play();
    play = false;
  } else {
    playPause.setAttribute("class", "fa-solid fa-play");
    songImg.style.animation = "none";
    play = true;
    songAudio.pause();
  }
});

// Loop button toggle
loop.addEventListener("click", () => {
  if (loopActive == false) {
    songAudio.setAttribute("loop", "");
    loop.style.color = "#c2d866";
    loopActive = true;
  } else {
    songAudio.removeAttribute("loop");
    loop.style.color = "#ffff";
    loopActive = false;
  }
});

// shuffle button toggle
let shuffleActive = false;
shuffle.addEventListener("click", () => {
  if (shuffleActive == false) {
    shuffle.style.color = "#c2d866";
    shuffleActive = true;
  } else {
    songAudio.removeAttribute("loop");
    shuffle.style.color = "#ffff";
    shuffleActive = false;
  }
});

function getRandomValueFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Like/Unlike toggle
like.addEventListener("click", () => {
  if (liked == false) {
    like.removeAttribute("class");
    like.setAttribute("class", "fa-solid fa-heart love");
    like.style.color = "red";
    like.style.fontSize = "18px";
    localStorage.setItem(`liked${songIndex}`, JSON.stringify(songs[songIndex]));
    liked = true;
  } else {
    like.removeAttribute("class");
    like.setAttribute("class", "fa-regular fa-heart love");
    like.style.color = "white";
    like.style.fontSize = "16px";
    liked = false;
  }
});

// songAudio.addEventListener("ended", function () {
//   songIndex++;
//   if ((loopActive = true)) {
//     return;
//   }else{

//   }
//   if (songIndex == songs.length) {
//     songIndex = 0;
//   }
//   updateSong();
// });

songAudio.addEventListener("ended", () => {
  if (loopActive == true) {
    return;
  } else {
    songIndex++;
    if (songIndex == songs.length) {
      songIndex = 0;
    }

    updateSong();
  }
});
