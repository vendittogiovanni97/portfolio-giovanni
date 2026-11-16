"use client";

/**
 * High-performance, zero-asset Web Audio API Synthesizer
 * Generates tactile, organic micro-sounds for UI interactions.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private lastSoundTime: number = 0;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-sound-muted");
      this.isMuted = saved === "true";
    }
  }

  private init() {
    if (this.initialized || typeof window === "undefined") return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;

      // Resume context on first user interaction if suspended by browser autoplay policy
      const resume = () => {
        if (this.ctx && this.ctx.state === "suspended") {
          this.ctx.resume();
        }
        window.removeEventListener("pointerdown", resume);
        window.removeEventListener("keydown", resume);
      };

      window.addEventListener("pointerdown", resume, { passive: true });
      window.addEventListener("keydown", resume, { passive: true });
    } catch {
      // AudioContext not supported or restricted
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-sound-muted", muted ? "true" : "false");
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.18, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    const next = !this.isMuted;
    this.setMuted(next);
    if (!next) {
      this.playPop(); // Audible confirmation of unmuting
    }
    return next;
  }

  private canPlay(minIntervalMs = 28): boolean {
    if (this.isMuted) return false;
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = performance.now();
    if (now - this.lastSoundTime < minIntervalMs) return false;
    this.lastSoundTime = now;
    return true;
  }

  /**
   * Soft tactile bubble/wooden pop (Grab sticker, tap chip, card carousel)
   */
  public playPop() {
    if (!this.canPlay()) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Pitch drops quickly for an organic wooden thud/pop
    osc.frequency.setValueAtTime(360, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.055);

    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.065);
  }

  /**
   * Crisp tactile micro-click (Buttons, links, toggles)
   */
  public playClick() {
    if (!this.canPlay(35)) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;

    // Double micro-transient simulating mechanical spring switch
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(840, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.022);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.028);
  }

  /**
   * Soft rubber thud (Sticker release, landing, boundary collision)
   */
  public playThud() {
    if (!this.canPlay(45)) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(125, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.08);

    gain.gain.setValueAtTime(0.16, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.085);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  /**
   * Playful ascending swish / chirp (Scatter stickers, filter switch)
   */
  public playSwish() {
    if (!this.canPlay(60)) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(560, t + 0.08);

    gain.gain.setValueAtTime(0.10, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.085);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  /**
   * Harmonic two-tone chord chime (Theme change, modal quick view)
   */
  public playChime() {
    if (!this.canPlay(80)) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime;

    const chord = [523.25, 659.25]; // C5, E5
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t + idx * 0.035);

      gain.gain.setValueAtTime(0.09, t + idx * 0.035);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.035 + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(t + idx * 0.035);
      osc.stop(t + idx * 0.035 + 0.17);
    });
  }
}

export const sound = new SoundEngine();
