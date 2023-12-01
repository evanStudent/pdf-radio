// Define the loadPDF function in the global scope
function loadPDF(pdfName) {
  const pdfViewer = document.querySelector('.pdf-viewer embed');
  const pdfPath = `./pdfs/${pdfName}`;

  pdfViewer.src = pdfPath;
}

document.addEventListener("DOMContentLoaded", function () {
  const volumeSlider = document.getElementById("volumeSlider");
  const playSymbols = document.querySelectorAll(".material-symbols-outlined");

  const nts = "http://stream-relay-geo.ntslive.net/stream";
  const cjlo = "http://rosetta.shoutca.st:8883/stream";
  const wnyc = "http://fm939.wnyc.org/wnycfm.aac";

  let audio = null;
  let playingButton = null;

  function playAudio(streamURL, button) {
    if (audio && !audio.paused) {
      audio.pause();
      audio = null;
      playingButton.textContent = "play_circle";
      playingButton.style.color = ""; // Remove font color
      console.log("Audio paused");
    } else {
      if (audio) {
        audio.pause();
        audio = null;
        playingButton.textContent = "play_circle";
        playingButton.style.color = ""; // Remove font color
      }
      audio = new Audio(streamURL);
      audio.volume = volumeSlider.value;
      audio
        .play()
        .then(() => {
          button.textContent = "pause_circle";
          button.style.color = "red"; // Change font color
          playingButton = button;
          console.log("Audio playback started");
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  }

  const playButtons = document.querySelectorAll(".player button");

  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let streamURL = "";
      if (button.id === "playNTS") streamURL = nts;
      else if (button.id === "playCJLO") streamURL = cjlo;
      else if (button.id === "playWNYC") streamURL = wnyc;

      playAudio(streamURL, button.querySelector(".material-symbols-outlined"));
    });
  });

  volumeSlider.addEventListener("input", function () {
    if (audio) {
      audio.volume = volumeSlider.value;
    }
  });

  // Event listeners for the buttons in the pdf-options div
  const pdfButtons = document.querySelectorAll(".pdf-options button");

  pdfButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const pdfName =
        button.textContent.trim().toLowerCase().replace(/\s+/g, "-") +
        ".pdf";
      loadPDF(pdfName);
    });
  });
});
