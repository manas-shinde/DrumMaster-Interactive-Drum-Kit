const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
let isRecording = false;
var recordedSound = [];
let startTime;
let recordBtn = document.getElementById("record");
let playBtn = document.getElementById("play");

function playSound(e) {
  let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();

  if (isRecording) {
    recordedSounds.push({ key: e.keyCode, time: Date.now() - startTime });
  }
}

function removeTransition(e) {
  if (e.propertyName != "transform") return;

  e.target.classList.remove("playing");
}

recordBtn.addEventListener("click", () => {
  isRecording = !isRecording;
  recordBtn.innerText = isRecording ? "Stop Recording" : "Record";
  recordBtn.classList.toggle("recording", isRecording);
  if (isRecording) {
    recordedSounds = [];
    startTime = Date.now();
  }
});

playBtn.addEventListener("click", () => {
  recordedSounds.forEach((sound, index) => {
    console.debug(
      `Setting timeout for sound ${index} with key ${sound.key} at time ${sound.time}`
    );
    setTimeout(() => {
      console.log(`Playing sound ${index} with key ${sound.key}`);
      const audio = document.querySelector(`audio[data-key="${sound.key}"]`);
      const key = document.querySelector(`div[data-key="${sound.key}"]`);
      if (audio) {
        key.classList.add("playing");
        audio.currentTime = 0;
        audio.play();
      }
    }, sound.time);
  });
});
