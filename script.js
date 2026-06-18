const STARTUP_SRC = "assets/startup-fast.mp4";
const CONTINUATION_SRC = "assets/continuation.mp4";
const MIDI_LOOP_SECONDS = 16.41;
const MIDI_HOOK = [[0,1.528,54,0.72,3],[0,1.528,58,0.72,3],[0,1.528,61,0.69,3],[0,1.528,65,0.73,3],[0.003,0.117,34,0.83,2],[0.003,0.117,61,0.96,15],[0.13,0.117,34,0.84,2],[0.257,0.233,61,0.97,15],[0.384,0.117,37,0.84,2],[0.511,0.117,36,0.84,2],[0.511,0.233,58,0.97,15],[0.765,0.254,32,0.87,2],[0.765,0.233,61,0.95,15],[1.02,0.117,34,0.87,2],[1.02,0.35,63,0.94,15],[1.528,0.117,29,0.85,2],[1.655,0.117,32,0.85,2],[1.782,0.117,34,0.83,2],[1.782,1.78,56,0.69,3],[1.782,1.78,60,0.72,3],[1.782,1.78,63,0.72,3],[2.036,0.117,32,0.86,2],[2.036,0.233,60,0.98,15],[2.164,0.117,34,0.83,2],[2.291,0.233,58,0.95,15],[2.418,0.117,37,0.84,2],[2.545,0.117,36,0.86,2],[2.545,0.35,60,0.94,15],[2.926,0.117,58,0.94,15],[3.053,0.35,56,0.97,15],[3.562,0.117,29,0.84,2],[3.689,0.117,32,0.87,2],[3.816,0.117,34,0.86,2],[3.816,1.78,54,0.73,3],[3.816,1.78,58,0.73,3],[3.816,1.78,61,0.72,3],[3.816,1.78,65,0.72,3],[4.07,0.117,34,0.86,2],[4.07,0.117,58,0.95,15],[4.197,0.117,34,0.87,2],[4.325,0.233,58,0.97,15],[4.452,0.117,37,0.84,2],[4.579,0.117,36,0.84,2],[4.579,0.233,60,0.98,15],[4.833,0.254,32,0.87,2],[4.833,0.233,61,0.94,15],[5.087,0.117,34,0.85,2],[5.087,0.233,58,0.97,15],[5.596,0.117,34,0.84,2],[5.596,0.233,56,0.97,15],[5.723,0.117,34,0.87,2],[5.85,0.117,27,0.87,2],[5.85,0.636,58,0.7,3],[5.85,0.636,61,0.69,3],[5.85,0.636,65,0.68,3],[5.85,0.636,68,0.69,3],[5.85,0.35,68,0.95,15],[6.104,0.117,27,0.83,2],[6.231,0.117,27,0.85,2],[6.358,0.233,68,0.96,15],[6.485,0.117,27,0.86,2],[6.613,0.117,32,0.87,2],[6.613,1.017,56,0.69,3],[6.613,1.017,60,0.71,3],[6.613,1.017,63,0.69,3],[6.613,0.72,63,0.94,15],[7.121,0.117,32,0.84,2],[7.248,0.117,32,0.83,2],[7.375,0.117,32,0.86,2],[7.63,0.117,29,0.83,2],[7.757,0.117,32,0.87,2],[7.884,0.117,34,0.87,2],[7.884,1.78,54,0.7,3],[7.884,1.78,58,0.68,3],[7.884,1.78,61,0.73,3],[7.884,1.78,65,0.69,3],[8.138,0.117,34,0.87,2],[8.138,0.117,58,0.97,15],[8.265,0.117,34,0.83,2],[8.392,0.233,58,0.97,15],[8.519,0.117,37,0.87,2],[8.646,0.117,36,0.87,2],[8.646,0.233,60,0.94,15],[8.901,0.254,32,0.85,2],[8.901,0.233,61,0.94,15],[9.155,0.117,34,0.86,2],[9.155,0.233,58,0.98,15],[9.409,0.233,61,0.98,15],[9.663,0.117,29,0.87,2],[9.663,0.233,63,0.94,15],[9.79,0.117,32,0.85,2],[9.918,0.117,34,0.83,2],[9.918,1.78,56,0.69,3],[9.918,1.78,60,0.72,3],[9.918,1.78,63,0.68,3],[10.172,0.117,32,0.84,2],[10.172,0.233,60,0.94,15],[10.299,0.117,34,0.87,2],[10.426,0.233,58,0.94,15],[10.553,0.117,37,0.87,2],[10.68,0.117,36,0.86,2],[10.68,0.35,60,0.96,15],[11.062,0.117,58,0.97,15],[11.189,0.35,56,0.96,15],[11.697,0.117,29,0.85,2],[11.824,0.117,32,0.86,2],[11.951,0.117,34,0.86,2],[11.951,1.907,54,0.69,3],[11.951,1.907,58,0.72,3],[11.951,1.907,61,0.7,3],[11.951,1.907,65,0.68,3],[12.206,0.117,34,0.85,2],[12.206,0.117,58,0.94,15],[12.333,0.117,34,0.87,2],[12.46,0.233,58,0.98,15],[12.587,0.117,37,0.83,2],[12.714,0.117,36,0.87,2],[12.714,0.233,60,0.94,15],[12.968,0.254,32,0.85,2],[12.968,0.233,61,0.97,15],[13.223,0.117,34,0.87,2],[13.223,0.233,58,0.98,15],[13.477,0.233,56,0.94,15],[13.731,0.117,34,0.86,2],[13.858,0.117,34,0.87,2],[13.985,0.117,27,0.87,2],[13.985,0.636,54,0.71,3],[13.985,0.636,58,0.7,3],[13.985,0.636,61,0.73,3],[13.985,0.636,65,0.73,3],[13.985,0.117,63,0.96,15],[14.24,0.117,27,0.83,2],[14.24,0.117,63,0.94,15],[14.367,0.117,27,0.87,2],[14.494,0.233,63,0.96,15],[14.621,0.117,27,0.85,2],[14.748,0.117,32,0.84,2],[14.748,1.144,56,0.68,3],[14.748,1.144,60,0.72,3],[14.748,1.144,63,0.7,3],[14.748,0.233,65,0.96,15],[15.002,0.847,63,0.94,15],[15.256,0.117,32,0.83,2],[15.384,0.117,32,0.84,2],[15.511,0.117,32,0.85,2],[15.765,0.117,29,0.83,2],[15.892,0.117,32,0.87,2],[16.019,0.117,34,0.87,2],[16.019,0.391,61,0.69,3],[16.019,0.391,63,0.73,3],[16.019,0.391,66,0.7,3],[16.019,0.391,70,0.72,3],[16.019,0.391,61,0.97,15],[16.273,0.117,34,0.87,2]];

const player = document.querySelector("[data-player]");
const gate = document.querySelector("[data-gate]");
const status = document.querySelector("[data-status]");

const preloader = document.createElement("video");
preloader.preload = "auto";
preloader.muted = true;
preloader.playsInline = true;
preloader.setAttribute("playsinline", "");

let continuationQueued = false;
let continuationSwapped = false;
let audioContext;
let audioLoopStarted = false;
let audioRetryBound = false;

const CHANNELS = {
  2: { type: "triangle", gain: 0.028, attack: 0.004, release: 0.06 },
  3: { type: "square", gain: 0.014, attack: 0.012, release: 0.1 },
  15: { type: "sawtooth", gain: 0.018, attack: 0.004, release: 0.09 }
};

function setStatus(message) {
  status.textContent = message;
}

function showGate() {
  gate.hidden = false;
  setStatus("Video is waiting. Tap anywhere to continue.");
}

function hideGate() {
  gate.hidden = true;
  setStatus("");
}

function midiToFrequency(note) {
  return 440 * (2 ** ((note - 69) / 12));
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
  player.muted = true;

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
  await tryPlayback();
}

function ensureAudioContext() {
  if (audioContext) {
    return audioContext;
  }

  const Context = window.AudioContext || window.webkitAudioContext;

  if (!Context) {
    return null;
  }

  audioContext = new Context({ latencyHint: "interactive" });

  const master = audioContext.createGain();
  master.gain.value = 0.12;

  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2100;
  filter.Q.value = 0.35;

  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.value = -26;
  compressor.knee.value = 12;
  compressor.ratio.value = 2.5;
  compressor.attack.value = 0.004;
  compressor.release.value = 0.18;

  master.connect(filter);
  filter.connect(compressor);
  compressor.connect(audioContext.destination);

  audioContext._master = master;
  return audioContext;
}

function scheduleLoop(loopStart) {
  const context = ensureAudioContext();

  if (!context) {
    return;
  }

  for (const [offset, duration, note, velocity, channel] of MIDI_HOOK) {
    const voice = CHANNELS[channel];

    if (!voice) {
      continue;
    }

    const startAt = loopStart + offset;
    const endAt = startAt + duration;
    const gainNode = context.createGain();
    const oscillator = context.createOscillator();

    oscillator.type = voice.type;
    oscillator.frequency.setValueAtTime(midiToFrequency(note), startAt);

    gainNode.gain.setValueAtTime(0.0001, startAt);
    gainNode.gain.linearRampToValueAtTime(voice.gain * velocity, startAt + Math.min(voice.attack, duration * 0.4));
    gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt + voice.release);

    oscillator.connect(gainNode);
    gainNode.connect(context._master);
    oscillator.start(startAt);
    oscillator.stop(endAt + voice.release + 0.03);
  }

  window.setTimeout(() => {
    if (audioLoopStarted && audioContext?.state === "running") {
      scheduleLoop(loopStart + MIDI_LOOP_SECONDS);
    }
  }, Math.max(120, ((loopStart + MIDI_LOOP_SECONDS) - context.currentTime - 0.08) * 1000));
}

async function tryAudio() {
  try {
    const context = ensureAudioContext();

    if (!context) {
      return;
    }

    await context.resume();

    if (!audioLoopStarted) {
      audioLoopStarted = true;
      scheduleLoop(context.currentTime + 0.08);
    }
  } catch (error) {
    setStatus("");
  }
}

function bindAudioRetries() {
  if (audioRetryBound) {
    return;
  }

  audioRetryBound = true;

  const retry = () => {
    if (!gate.hidden) {
      void tryPlayback();
    }
    void tryAudio();
  };

  window.addEventListener("pointerdown", retry, { passive: true });
  window.addEventListener("keydown", retry);
  window.addEventListener("focus", retry);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      retry();
    }
  });
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

window.addEventListener("load", () => {
  player.src = STARTUP_SRC;
  player.load();
  bindAudioRetries();

  requestAnimationFrame(() => {
    void tryPlayback();
    void tryAudio();
    window.setTimeout(primeContinuation, 140);
  });
});
