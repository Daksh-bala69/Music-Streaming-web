let isPlaying = true;

const mainPlayButton = document.getElementById("mainPlayButton");
const bottomPlayButton = document.getElementById("bottomPlayButton");


const progressFill = document.getElementById("progressFill");

const bottomAlbumCover = document.getElementById("bottomAlbumCover");
const bottomSongTitle = document.getElementById("bottomSongTitle");
const bottomSongArtist = document.getElementById("bottomSongArtist");


function updatePlayButtons() {
  if (isPlaying) {
    mainPlayButton.textContent = "Ⅱ";
    bottomPlayButton.textContent = "Ⅱ";
  } else {
    mainPlayButton.textContent = "▶";
    bottomPlayButton.textContent = "▶";
  }
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

updatePlayButtons();


// MAKING THE PROGRESS BAR FUNCTION

let progress = 0;

setInterval(function() {
  if(isPlaying){
    progress++;
    
    if(progress > 100) {
      progress = 0;
    }
    
    progressFill.style.width = progress + "%";
  }
}, 200);


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

    item.classList.add("active");
    item.querySelector(".songTime").textContent = "▶";

    //UPDATING THE BOTTOM PLAYER (These obj's were defined at the beginning)
    const queueSongInfo = item.querySelector(".queueSongInfo");

    bottomSongTitle.textContent = queueSongInfo.querySelector("h4").textContent;
    bottomSongArtist.textContent = queueSongInfo.querySelector("p").textContent;
    bottomAlbumCover.src = item.querySelector("img").src;
    
    progress = 0;
    progressFill.style.width = "0%";
  });
});
