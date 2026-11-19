// Audio Synthesis using Web Audio API
// 100% standalone, zero external MP3s, zero network latency, instant 60fps playback!

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * 1. Physical Heavy Rope & Tension Stretch Sound (Krrr-Chkk! 🪢)
 * Plays when user grabs and starts pulling the hanging trophy or medals.
 * Simulates heavy fibrous braided rope creaking under physical load:
 * - Granular rope fiber friction scrape (multi-grain stick-slip noise)
 * - Deep resonant taut cord body thud (weight & mass)
 * - Subtle ceiling anchor bracket metallic tension strain
 */
export function playRopePullSound(intensity = 1.0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // --- LAYER 1: Deep Taut Cord Resonant Thud (Mass & Weight) ---
    const strainOsc = ctx.createOscillator();
    const strainGain = ctx.createGain();
    strainOsc.type = 'triangle';
    strainOsc.frequency.setValueAtTime(105, now);
    strainOsc.frequency.exponentialRampToValueAtTime(68, now + 0.18);

    strainGain.gain.setValueAtTime(0.001, now);
    strainGain.gain.linearRampToValueAtTime(0.38 * intensity, now + 0.02);
    strainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    strainOsc.connect(strainGain);
    strainGain.connect(ctx.destination);
    strainOsc.start(now);
    strainOsc.stop(now + 0.21);

    // --- LAYER 2: Multi-Grain Stick-Slip Rope Fiber Creak (Krr-chkk!) ---
    // 4 micro-grains fired in rapid succession simulate individual rope strands rubbing
    const grainDelays = [0.0, 0.032, 0.068, 0.115];
    const grainFreqs = [720, 850, 680, 960];
    const grainDurs = [0.038, 0.042, 0.048, 0.052];

    grainDelays.forEach((delay, idx) => {
      const gStart = now + delay;
      const gDur = grainDurs[idx];
      const bufSize = Math.floor(ctx.sampleRate * gDur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);

      for (let i = 0; i < bufSize; i++) {
        const progress = i / bufSize;
        const env = Math.sin(progress * Math.PI);
        // Granular friction spikes
        const spike = Math.random() > 0.35 ? (Math.random() * 2 - 1) : 0;
        data[i] = spike * env;
      }

      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = buf;

      // Resonant bandpass filter for wood/hemp cordage texture
      const bpFilter = ctx.createBiquadFilter();
      bpFilter.type = 'bandpass';
      bpFilter.frequency.setValueAtTime(grainFreqs[idx], gStart);
      bpFilter.Q.setValueAtTime(5.8, gStart);

      const gGain = ctx.createGain();
      gGain.gain.setValueAtTime(0.001, gStart);
      gGain.gain.linearRampToValueAtTime(0.32 * intensity, gStart + 0.007);
      gGain.gain.exponentialRampToValueAtTime(0.001, gStart + gDur);

      noiseSrc.connect(bpFilter);
      bpFilter.connect(gGain);
      gGain.connect(ctx.destination);

      noiseSrc.start(gStart);
      noiseSrc.stop(gStart + gDur + 0.01);
    });

    // --- LAYER 3: Metallic Anchor Bracket Ring Strain (Ting-squeak) ---
    const ringOsc = ctx.createOscillator();
    const ringGain = ctx.createGain();
    ringOsc.type = 'sine';
    ringOsc.frequency.setValueAtTime(2200, now);
    ringOsc.frequency.exponentialRampToValueAtTime(1420, now + 0.07);

    ringGain.gain.setValueAtTime(0.001, now);
    ringGain.gain.linearRampToValueAtTime(0.14 * intensity, now + 0.006);
    ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    ringOsc.connect(ringGain);
    ringGain.connect(ctx.destination);
    ringOsc.start(now);
    ringOsc.stop(now + 0.08);
  } catch (err) {
    // Graceful fallback
  }
}

/**
 * Dynamic Rope Stretch Creak (Real-time dragging audio feedback 🪢)
 * Triggered continuously in handlePointerMove as user pulls further down.
 * Every pixel dragged triggers tactile fiber creaks whose pitch rises with tension!
 */
let lastCreakTime = 0;
export function playRopeStretchCreak(tensionRatio = 0.5) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const nowMs = performance.now();
    // Debounce to prevent audio buffer spam, creating smooth tactile ratchet
    if (nowMs - lastCreakTime < 50) return;
    lastCreakTime = nowMs;

    const now = ctx.currentTime;
    const dur = 0.032;
    const bufSize = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);

    for (let i = 0; i < bufSize; i++) {
      const progress = i / bufSize;
      const env = Math.sin(progress * Math.PI);
      data[i] = (Math.random() * 2 - 1) * env * (Math.random() > 0.3 ? 1 : 0.2);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    // Pitch rises dynamically as tension increases: 650Hz at start -> 1450Hz at max pull
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const centerFreq = 620 + Math.min(1, Math.max(0, tensionRatio)) * 800;
    filter.frequency.setValueAtTime(centerFreq, now);
    filter.Q.setValueAtTime(6.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.20 + tensionRatio * 0.16, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + dur + 0.01);
  } catch (err) {
    // Graceful fallback
  }
}

/**
 * Elastic Snap Recoil Sound (Twwoing-whoosh! ⚡)
 * Plays when user releases the pulled rope before the harmonic chime rings.
 */
export function playRopeSnapSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Elastic snap pitch drop
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(260, now);
    snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.055);

    snapGain.gain.setValueAtTime(0.001, now);
    snapGain.gain.linearRampToValueAtTime(0.25, now + 0.005);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.07);

    // Air whoosh recoil
    const dur = 0.07;
    const bufSize = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufSize) * Math.PI);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, now);
    filter.frequency.exponentialRampToValueAtTime(250, now + dur);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.16, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + dur + 0.01);
  } catch (err) {
    // Graceful fallback
  }
}

/**
 * 2. Harmonic Golden Bell / Chime Sound with Elastic Snap
 * Triggered when releasing trophy / medals
 */
export function playChimeSound(type = 'gold') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Snap release twang (t = 0 to 40ms)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(280, now);
    snapOsc.frequency.exponentialRampToValueAtTime(110, now + 0.05);
    snapGain.gain.setValueAtTime(0.18, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.06);

    // Harmonic bell chime (t = 15ms)
    const chimeStart = now + 0.015;
    const baseFreq = type === 'silver' ? 1046.5 : type === 'bronze' ? 659.25 : 880; // A5 for gold
    const harmonics = [1, 2.01, 2.98, 4.05];
    const weights = [0.24, 0.12, 0.07, 0.035];

    harmonics.forEach((h, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * h, chimeStart);

      const decayTime = 0.55 + idx * 0.15;
      gain.gain.setValueAtTime(0.001, chimeStart);
      gain.gain.linearRampToValueAtTime(weights[idx], chimeStart + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, chimeStart + decayTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(chimeStart);
      osc.stop(chimeStart + decayTime);
    });
  } catch (err) {
    // Graceful fallback
  }
}

/**
 * 3. Authentic Mechanical Camera Shutter Sound (Krr-Click! 📸)
 * Triggered on photo file upload / preview capture in Campus Lens
 */
export function playCameraShutterSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Helper: generate white noise buffer
    const bufferSize = ctx.sampleRate * 0.12;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // Part 1: Quick mechanical mirror lift (t = 0ms)
    const noise1 = ctx.createBufferSource();
    noise1.buffer = noiseBuffer;
    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(1400, now);
    filter1.Q.setValueAtTime(3.5, now);

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.3, now + 0.006);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    noise1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(ctx.destination);
    noise1.start(now);
    noise1.stop(now + 0.03);

    // Part 2: Sharp Shutter Blade Snap (t = 38ms)
    const t2 = now + 0.038;
    const noise2 = ctx.createBufferSource();
    noise2.buffer = noiseBuffer;
    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'highpass';
    filter2.frequency.setValueAtTime(2200, t2);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.001, t2);
    gain2.gain.linearRampToValueAtTime(0.45, t2 + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.045);

    noise2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(ctx.destination);
    noise2.start(t2);
    noise2.stop(t2 + 0.05);

    // Part 3: Soft motor whir / aperture click (t = 65ms)
    const t3 = now + 0.065;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, t3);
    osc.frequency.exponentialRampToValueAtTime(450, t3 + 0.04);

    oscGain.gain.setValueAtTime(0.08, t3);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t3 + 0.045);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(t3);
    osc.stop(t3 + 0.05);
  } catch (err) {
    // Graceful fallback
  }
}

/**
 * 4. Soft Confetti / Celebration Pop
 */
export function playConfettiPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (err) {
    // Graceful fallback
  }
}

/**
 * 5. Premium Tactile Navbar Click Sound (Juicy Pop / Switch Tap 🔘)
 * Provides ultra-satisfying, crisp tactile feedback for navigation buttons:
 * - High-speed transient micro-click (tactile contact)
 * - Warm resonant body (smooth woodblock / bubble pop)
 */
export function playNavClickSound(style = 'bubble') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Layer 1: Crisp tactile click transient (contact feel)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(style === 'action' ? 1800 : 1400, now);
    clickOsc.frequency.exponentialRampToValueAtTime(600, now + 0.015);

    clickGain.gain.setValueAtTime(0.001, now);
    clickGain.gain.linearRampToValueAtTime(0.18, now + 0.002);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.02);

    // Layer 2: Warm resonant body pop
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    bodyOsc.type = 'sine';
    const startFreq = style === 'action' ? 820 : 640;
    const endFreq = style === 'action' ? 520 : 380;
    bodyOsc.frequency.setValueAtTime(startFreq, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.045);

    bodyGain.gain.setValueAtTime(0.001, now);
    bodyGain.gain.linearRampToValueAtTime(0.22, now + 0.004);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    bodyOsc.connect(bodyGain);
    bodyGain.connect(ctx.destination);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.055);
  } catch (err) {
    // Graceful fallback
  }
}
