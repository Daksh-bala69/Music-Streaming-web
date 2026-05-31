let isPlaying = false;

let currSong = new Audio("./assets/audio/05 - Good Life.flac");
//CURRENT TIME AND THE DURATION OF THE SONG (CURRENT TIME NEEDS TO UPDATED FREQUENTLY )

function setDuration(){
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  currSong.addEventListener("loadedmetadata", function () {
    const durationMinutes = Math.floor(currSong.duration / 60);
    const durationSeconds = Math.floor(currSong.duration % 60);

    duration.textContent =
      durationMinutes + ":" + String(durationSeconds).padStart(2, "0");
  });
}

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
  if(isPlaying && duration){
    const minutes = Math.floor(currSong.currentTime / 60);
    const seconds = Math.floor(currSong.currentTime % 60);
    
    //SUCH THAT THE CURRENT TIME IS ALWATYS OF 2 DIGITS
    currentTime.textContent = minutes + ":" + String(seconds).padStart(2,"0");
  }
}, 500);


//CHANGING QUEUE

const queueItems = document.querySelectorAll(".queueItem");

queueItems.forEach((item) => {
  item.addEventListener("click" , function () {
    queueItems.forEach((song) =>{
      song.classList.remove("active");
      
      const songTime = song.querySelector(".songTime");
      if(songTime.textContent === "▶") {
        songTime.textContent = song.dataset.time;
      }
    });
    console.log(item.dataset.audio);

    currSong.pause();
    currSong = new Audio(item.dataset.audio);
    isPlaying = true;

    setDuration();
    updatePlayButtons();
    item.classList.add("active");
    item.querySelector(".songTime").textContent = "▶";

    //UPDATING THE BOTTOM PLAYER (These obj's were defined at the beginning)
    const queueSongInfo = item.querySelector(".queueSongInfo");

    bottomSongTitle.textContent = queueSongInfo.querySelector("h4").textContent;
    bottomSongArtist.textContent = queueSongInfo.querySelector("p").textContent;
    bottomAlbumCover.src = item.querySelector("img").src;
    
    //UPDATING THE MAIN PLAYER (These obj's were defined at the beginning)
    mainSongTitle.textContent = queueSongInfo.querySelector("h4").textContent;
    mainSongArtist.textContent = queueSongInfo.querySelector("p").textContent;
    mainPlayerCover.src = item.querySelector("img").src;

    progress = 0;
    progressFill.style.width = "0%";
  });
});
