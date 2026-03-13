const video = document.getElementById('hero-video');
const fallbackMessage = document.getElementById('fallback-message');
const soundToggle = document.getElementById('sound-toggle');
const root = document.documentElement;
const SOUND_PREF_KEY = 'black-video-landing:sound-enabled';

function showFallback(message) {
  if (!fallbackMessage) return;

  if (message) {
    fallbackMessage.innerHTML = message;
  }

  fallbackMessage.hidden = false;
  root.classList.add('has-fallback');
}

function setSoundButtonState() {
  if (!soundToggle || !video) return;

  const soundEnabled = !video.muted;
  soundToggle.textContent = soundEnabled ? 'Mute sound' : 'Enable sound';
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
}

async function attemptPlayback({ withSound = false } = {}) {
  if (!video) return false;

  video.muted = !withSound;
  video.defaultMuted = !withSound;

  try {
    await video.play();
    setSoundButtonState();
    return true;
  } catch {
    return false;
  }
}

async function startVideo() {
  const userWantsSound = window.localStorage.getItem(SOUND_PREF_KEY) === 'true';

  if (userWantsSound) {
    const startedWithSound = await attemptPlayback({ withSound: true });

    if (startedWithSound) {
      return;
    }
  }

  const startedMuted = await attemptPlayback({ withSound: false });

  if (!startedMuted) {
    showFallback(`
      <p>The video could not autoplay in this browser.</p>
      <p>Make sure your file is a browser-friendly MP4 and that the path is correct.</p>
    `);
  }
}

async function toggleSound(forceEnable = false) {
  if (!video) return;

  const enableSound = forceEnable || video.muted;

  video.muted = !enableSound;
  video.defaultMuted = !enableSound;
  window.localStorage.setItem(SOUND_PREF_KEY, String(enableSound));

  try {
    if (video.paused) {
      await video.play();
    }
  } catch {
    video.muted = true;
    video.defaultMuted = true;
    window.localStorage.setItem(SOUND_PREF_KEY, 'false');
  }

  setSoundButtonState();
}

if (video) {
  setSoundButtonState();

  video.addEventListener('error', () => {
    showFallback(`
      <p>The video file could not be loaded.</p>
      <p>Check <code>/assets/videos/replace-me.mp4</code> or update the source in <code>index.html</code>.</p>
    `);
  });

  video.addEventListener('click', () => {
    if (video.muted) {
      toggleSound(true);
    }
  });

  video.addEventListener('volumechange', setSoundButtonState);

  if (video.readyState >= 2) {
    startVideo();
  } else {
    video.addEventListener('canplay', startVideo, { once: true });
  }
}

if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    toggleSound();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.repeat) return;

  if (event.key === 'm' || event.key === 'M') {
    toggleSound();
  }
});
