const STARTUP_SRC = "assets/startup-alt.mp4";
const CONTINUATION_SRC = "assets/continuation.mp4";

const player = document.querySelector("[data-player]");
const gate = document.querySelector("[data-gate]");
const gateLabel = document.querySelector("[data-gate-label]");
const status = document.querySelector("[data-status]");
const unlock = document.querySelector("[data-unlock]");
const unlockPin = document.querySelector("[data-unlock-pin]");

const preloader = document.createElement("video");
preloader.preload = "auto";
preloader.muted = true;
preloader.playsInline = true;
preloader.setAttribute("playsinline", "");

const UNLOCK_THRESHOLD = 0.92;

let continuationQueued = false;
let continuationSwapped = false;
let dragging = false;
let unlockProgress = 0;
let dragStartY = 0;
let dragStartProgress = 0;

function setStatus(message) {
  status.textContent = message;
}

function showGate() {
  gate.hidden = false;
  gate.classList.remove("gate--unlocking");
  setUnlockProgress(0);
  gateLabel.textContent = "Slide up to unlock";
  setStatus("Playback is ready. Slide up to unlock.");
}

function hideGate() {
  gate.hidden = true;
  gate.classList.remove("gate--unlocking");
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

function setUnlockProgress(progress) {
  unlockProgress = Math.max(0, Math.min(1, progress));

  if (!unlock || !unlockPin) {
    return;
  }

  const slotHeight = unlock.offsetHeight;
  const pinHeight = unlockPin.offsetHeight;
  const travel = Math.max(0, slotHeight - pinHeight - 16);
  const y = (1 - unlockProgress) * travel;

  unlock.style.setProperty("--unlock-progress", unlockProgress.toFixed(3));
  unlockPin.style.transform = `translate(-50%, -${y}px)`;
}

async function tryPlayback(unmuted = true) {
  player.muted = !unmuted;
  player.volume = 1;

  try {
    await player.play();
    hideGate();
    return true;
  } catch (error) {
    player.pause();
    player.currentTime = 0;
    showGate();
    return false;
  }
}

async function continuePlayback() {
  if (continuationSwapped) {
    return;
  }

  continuationSwapped = true;
  player.src = CONTINUATION_SRC;
  player.load();
  await tryPlayback(true);
}

async function commitUnlock() {
  if (unlockProgress < UNLOCK_THRESHOLD) {
    gateLabel.textContent = "Slide up to unlock";
    setUnlockProgress(0);
    return;
  }

  gateLabel.textContent = "Unlocked";
  gate.classList.add("gate--unlocking");
  setStatus("Playback unlocked.");
  setUnlockProgress(1);
  const ok = await tryPlayback(true);

  if (!ok) {
    gate.classList.remove("gate--unlocking");
    gateLabel.textContent = "Slide up to unlock";
    setUnlockProgress(0);
  }
}

function beginUnlock(pointerY) {
  if (gate.hidden) {
    return;
  }

  dragging = true;
  dragStartY = pointerY;
  dragStartProgress = unlockProgress;
  unlockPin.classList.add("unlock__pin--dragging");
}

function updateUnlock(pointerY) {
  if (!dragging || !unlock || !unlockPin) {
    return;
  }

  const slotHeight = unlock.offsetHeight;
  const pinHeight = unlockPin.offsetHeight;
  const travel = Math.max(1, slotHeight - pinHeight - 16);
  const delta = dragStartY - pointerY;
  setUnlockProgress(dragStartProgress + (delta / travel));
}

async function endUnlock() {
  if (!dragging) {
    return;
  }

  dragging = false;
  unlockPin.classList.remove("unlock__pin--dragging");
  await commitUnlock();
}

player.addEventListener("ended", () => {
  void continuePlayback();
});

player.addEventListener("playing", () => {
  hideGate();
});

player.addEventListener("error", () => {
  showGate();
});

unlockPin.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  unlockPin.setPointerCapture(event.pointerId);
  beginUnlock(event.clientY);
});

unlockPin.addEventListener("pointermove", (event) => {
  updateUnlock(event.clientY);
});

unlockPin.addEventListener("pointerup", () => {
  void endUnlock();
});

unlockPin.addEventListener("pointercancel", () => {
  void endUnlock();
});

unlockPin.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    setUnlockProgress(unlockProgress + 0.2);
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (unlockProgress >= UNLOCK_THRESHOLD) {
      void commitUnlock();
    }
  }
});

window.addEventListener("load", () => {
  player.src = STARTUP_SRC;
  player.load();
  setUnlockProgress(0);

  requestAnimationFrame(() => {
    void tryPlayback(true);
    window.setTimeout(primeContinuation, 140);
  });
});
