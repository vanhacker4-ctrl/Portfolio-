// Silent Audio Engine (Audio / Sound effects disabled)
class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.initialized = false;
  }

  init() {}

  toggleSound() {
    this.enabled = false;
    return false;
  }

  playHover() {}
  playClick() {}
  playGlitch() {}
  playChime() {}
  playKeystroke() {}
}

export const cyberAudio = new CyberAudioEngine();
