const STARTUP_SRC = "assets/startup-alt.mp4";
const CONTINUATION_SRC = "assets/continuation.mp4";

const startupPlayer = document.querySelector("[data-startup-player]");
const continuationPlayer = document.querySelector("[data-continuation-player]");
const gate = document.querySelector("[data-gate]");
const gateLabel = document.querySelector("[data-gate-label]");
const status = document.querySelector("[data-status]");
const unlock = document.querySelector("[data-unlock]");
const unlockPin = document.querySelector("[data-unlock-pin]");

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
  continuationPlayer.load();
}

function setUnlockProgress(progress) {
  unlockProgress = Math.max(0, Math.min(1, progress));

  if (!unlock || !unlockPin) {
    return;
  }

  const slotHeight = unlock.offsetHeight;
  const pinHeight = unlockPin.offsetHeight;
  const travel = Math.max(0, slotHeight - pinHeight - 16);
  const y = unlockProgress * travel;

  unlock.style.setProperty("--unlock-progress", unlockProgress.toFixed(3));
  unlockPin.style.transform = `translate(-50%, -${y}px)`;
}

function activePlayer() {
  return continuationSwapped ? continuationPlayer : startupPlayer;
}

async function tryPlayback(unmuted = true) {
  const player = activePlayer();
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
  startupPlayer.pause();
  startupPlayer.classList.remove("player--active");
  startupPlayer.classList.add("player--hidden");
  continuationPlayer.classList.remove("player--hidden");
  continuationPlayer.classList.add("player--active");
  continuationPlayer.muted = startupPlayer.muted;
  continuationPlayer.volume = startupPlayer.volume;
  await continuationPlayer.play().catch(() => {
    showGate();
  });
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

startupPlayer.addEventListener("ended", () => {
  void continuePlayback();
});

startupPlayer.addEventListener("playing", () => {
  hideGate();
});

continuationPlayer.addEventListener("playing", () => {
  hideGate();
});

startupPlayer.addEventListener("error", () => {
  showGate();
});

continuationPlayer.addEventListener("error", () => {
  showGate();
});

startupPlayer.addEventListener("timeupdate", () => {
  if (continuationSwapped || !continuationQueued) {
    return;
  }

  if (startupPlayer.duration - startupPlayer.currentTime < 0.45 && continuationPlayer.readyState >= 3) {
    void continuePlayback();
  }
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
  startupPlayer.src = STARTUP_SRC;
  continuationPlayer.src = CONTINUATION_SRC;
  startupPlayer.load();
  setUnlockProgress(0);

  requestAnimationFrame(() => {
    void tryPlayback(true);
    window.setTimeout(primeContinuation, 140);
  });
});
