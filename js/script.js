let isPlaying = true;

const mainPlayButton = document.getElementById("mainPlayButton");
const bottomPlayButton = document.getElementById("bottomPlayButton");

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
