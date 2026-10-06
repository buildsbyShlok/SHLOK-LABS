'use client';

export type SoundType = 'click' | 'open' | 'close' | 'nav' | 'toggle';

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  
  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('shlok-sound-enabled');
      this.enabled = stored === 'true';
    }
  }

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleSound() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('shlok-sound-enabled', String(this.enabled));
    }
    if (this.enabled && !this.ctx) {
      this.init();
    }
    return this.enabled;
  }

  public isEnabled() {
    return this.enabled;
  }

  public play(type: SoundType) {
    if (!this.enabled) return;
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;

      switch (type) {
        case 'click':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1800, now);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
          osc.start(now);
          osc.stop(now + 0.02);
          break;
        case 'open':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(650, now + 0.03);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case 'close':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(650, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case 'nav':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
          osc.start(now);
          osc.stop(now + 0.015);
          break;
        case 'toggle':
          osc.type = 'square';
          osc.frequency.setValueAtTime(900, now);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
          osc.start(now);
          osc.stop(now + 0.02);
          break;
      }
    } catch {
      // AudioContext state edge case fallback
    }
  }
}

export const soundManager = new SoundManager();
