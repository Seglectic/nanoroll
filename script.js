const STARTUP_SRC = "assets/startup-fast.mp4";
const CONTINUATION_SRC = "assets/continuation.mp4";

const player = document.querySelector("[data-player]");
const gate = document.querySelector("[data-gate]");
const status = document.querySelector("[data-status]");

const preloader = document.createElement("video");
preloader.preload = "auto";
preloader.muted = true;
preloader.playsInline = true;
preloader.setAttribute("playsinline", "");

let startupFinished = false;
let continuationQueued = false;
let continuationSwapped = false;

function setStatus(message) {
  status.textContent = message;
}

function showGate() {
  gate.hidden = false;
  setStatus("Playback is paused. Tap anywhere to continue.");
}

function hideGate() {
  gate.hidden = true;
  setStatus("");
}

function primeContinuation() {
  if (continuationQueued) {
    return;
  }

  continuationQueued = true;
  preloader.src = CONTINUATION_SRC;
  preloader.load();
}

async function tryPlayback() {
  player.muted = false;
  player.volume = 1;

  try {
    await player.play();
    hideGate();
  } catch (error) {
    showGate();
  }
}

async function continuePlayback() {
  if (continuationSwapped) {
    return;
  }

  continuationSwapped = true;
  player.src = CONTINUATION_SRC;
  player.load();

  try {
    await player.play();
    hideGate();
  } catch (error) {
    showGate();
  }
}

gate.addEventListener("click", async () => {
  if (startupFinished) {
    await continuePlayback();
    return;
  }

  await tryPlayback();
});

player.addEventListener("ended", async () => {
  startupFinished = true;
  await continuePlayback();
});

player.addEventListener("error", () => {
  showGate();
});

window.addEventListener("load", () => {
  player.src = STARTUP_SRC;
  player.load();

  requestAnimationFrame(() => {
    void tryPlayback();
    window.setTimeout(primeContinuation, 140);
  });
});
