const songs =[
  {
    title: "Good Life",
    artist : "Kanye West",
    audio: "./assets/audio/05 - Good Life.flac",
    cover: "./assets/images/Kanye-Graduation-blank.png",
    duration: "3:23"
  },
  {
    title: "Stronger",
    artist : "Kanye West",
    audio: "./assets/audio/03 - Stronger.flac",
    cover: "./assets/images/Kanye-Graduation-blank.png",
    duration: "5:12"
  },
  {
    title: "Flashing Lights",
    artist : "Kanye West",
    audio: "./assets/audio/09 - Flashing Lights.flac",
    cover: "./assets/images/Kanye-Graduation-blank.png",
    duration: "3:57"
  },
  {
    title: "Homecoming",
    artist : "Kanye West",
    audio: "./assets/audio/12 - Homecoming.flac",
    cover: "./assets/images/Kanye-Graduation-blank.png",
    duration: "3:24"
  }
];


let isPlaying = false;

let currSongIndex = 0;
let currSong = new Audio(songs[currSongIndex].audio);
//CURRENT TIME AND THE DURATION OF THE SONG (CURRENT TIME NEEDS TO UPDATED FREQUENTLY )
const currentTime = document.getElementById("currentTime");

function setDuration(){
  const duration = document.getElementById("duration");

  currSong.addEventListener("loadedmetadata", function () {
    const durationMinutes = Math.floor(currSong.duration / 60);
    const durationSeconds = Math.floor(currSong.duration % 60);

    duration.textContent =
      durationMinutes + ":" + String(durationSeconds).padStart(2, "0");
  });
}
setDuration();

const mainPlayButton = document.getElementById("mainPlayButton");
const bottomPlayButton = document.getElementById("bottomPlayButton");


const progressFill = document.getElementById("progressFill");

// BOTTOM PLAYER ELEMENTS
const bottomAlbumCover = document.getElementById("bottomAlbumCover");
const bottomSongTitle = document.getElementById("bottomSongTitle");
const bottomSongArtist = document.getElementById("bottomSongArtist");

// MAIN PLAYER ELEMENTS
const mainPlayerCover= document.getElementById("mainPlayerCover");
const mainSongTitle= document.getElementById("mainSongTitle");
const mainSongArtist= document.getElementById("mainSongArtist");

console.log(mainPlayerCover);
console.log(mainSongArtist);
console.log(mainSongTitle);


const queueItems = document.querySelectorAll(".queueItem");

function loadSong(index) {
// CHANGING LOGIC INFO
  const song = songs[index];
  currSong = new Audio(song.audio);
  currSongIndex = index;  
// CHANGING THE CONTENTS DISPLAYED

  mainSongTitle.textContent = song.title;
  mainSongArtist.textContent = song.artist;
  mainPlayerCover.src = song.cover;

  bottomSongTitle.textContent = song.title;
  bottomSongArtist.textContent = song.artist;
  bottomAlbumCover.src = song.cover;

// SETTING THE DURATION;
  setDuration();
  progressFill.style.width = "0%";
  currentTime.textContent = "0:00";
  
//CHANGING THE ACTIVE QUEUE MEMBER
  queueItems.forEach((item, idx) => {
    item.classList.remove("active");
    const itemSpan = queueItems[idx].querySelector("span");
    itemSpan.textContent = songs[idx].duration;
  });
  queueItems[index].classList.add("active");
  queueItems[index].querySelector(".songTime").textContent = "▶";

};

loadSong(0);


function updatePlayButtons() {
  if (isPlaying) {
    mainPlayButton.textContent = "Ⅱ";
    bottomPlayButton.textContent = "Ⅱ";
    currSong.play();
  } else {
    mainPlayButton.textContent = "▶";
    bottomPlayButton.textContent = "▶";
    currSong.pause();
  }
  console.log(currSong);
}
// Making the play buttons fucntionable
mainPlayButton.addEventListener("click", function(){
  isPlaying = !isPlaying;
  updatePlayButtons();
});


bottomPlayButton.addEventListener("click", function(){
  isPlaying = !isPlaying;
  updatePlayButtons();
});



// MAKING THE PROGRESS BAR FUNCTION

let progress = 0;

setInterval(function() {
  if(isPlaying){
    progress = currSong.currentTime/currSong.duration * 100;    

    if(progress > 100) {
      progress = 0;
    }
    
    progressFill.style.width = progress + "%";
  }

//MAKING SURE THAT THE CURRENT TIME DOESNT SHOW NaN
  if(duration){
    const minutes = Math.floor(currSong.currentTime / 60);
    const seconds = Math.floor(currSong.currentTime % 60);
    
    //SUCH THAT THE CURRENT TIME IS ALWATYS OF 2 DIGITS
    currentTime.textContent = minutes + ":" + String(seconds).padStart(2,"0");
  }
}, 500);


//CHANGING QUEUE


queueItems.forEach((item, index) => {
  item.addEventListener("click" , function () {
    currSong.pause();
    loadSong(index);

    isPlaying = true;
    updatePlayButtons();
  });
});

// FOR CLICKING THE PROGRESS BAR TO CHANGE DURATION FO THE SONG
const progressBar = document.querySelector(".progressBar");


function seek(e) {

  if (!currSong.duration) return;
  const rect = progressBar.getBoundingClientRect();

  let clickX = e.clientX - rect.left;
  let percent = clickX / rect.width;

  percent = Math.max(0, Math.min(1, percent));

  currSong.currentTime = percent * currSong.duration;
  progressFill.style.width = percent * 100 + "%";
  
}

progressBar.addEventListener("click", function (e) {
  seek(e);
});

// FOR DRAGGING THE PROGRESS BAR
let isDragging = false;


progressBar.addEventListener("mousedown", function (e) {
  isDragging = true;
  seek(e);
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    seek(e);
  }
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});


const rect = progressBar.getBoundingClientRect();
console.log(rect);

