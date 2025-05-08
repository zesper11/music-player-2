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

const previousBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const songImg = document.querySelector("img");
const songAudio = document.querySelector("audio");
const playPause = document.querySelector("#play-pause i");
const loop = document.querySelector("#loop");
const like = document.querySelector(".love");

let songIndex = 0;
let play = true;

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex == songs.length) {
    songIndex = 0;
  }
  songAudio.src = songs[songIndex].songSrc;
  songImg.src = songs[songIndex].songImg;
  playPause.setAttribute("class", "fa-solid fa-pause");
  songImg.style.animation = "19s rotate360 infinite linear";
  songAudio.play();
  play = false;
  let localStorageLiked = localStorage.getItem(`liked${songIndex}`);
  if (localStorageLiked == songs[songIndex]) {
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

previousBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex == -1) {
    songIndex = songs.length - 1;
  }
  songAudio.src = songs[songIndex].songSrc;
  songImg.src = songs[songIndex].songImg;
  playPause.setAttribute("class", "fa-solid fa-pause");
  songImg.style.animation = "19s rotate360 infinite linear";
  songAudio.play();
  play = false;
  let localStorageLiked = localStorage.getItem(`liked${songIndex}`);
  if (localStorageLiked == songs[songIndex]) {
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

songAudio.pause();
songImg.style.animation = "none";

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

let loopActive = false;

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

let liked = false;
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

// functions

function autoPlay() {
  songIndex++;
  if (songIndex == songs.length) {
    songIndex = 0;
  }
  songAudio.src = songs[songIndex].songSrc;
  songImg.src = songs[songIndex].songImg;
  playPause.setAttribute("class", "fa-solid fa-pause");
  songImg.style.animation = "19s rotate360 infinite linear";
  songAudio.play();
  play = false;
}
