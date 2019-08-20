import * as SOUNDS from "pixi-sound";
import * as PIXI from "pixi.js";

export class PixiAudioAdapter {
  muted = false;
  constructor() {

  }
  play(name) {

    return PIXI["sound"].play(name);

  }

  loop(name) {
    const audio = PIXI["audioManager"].getAudio(name);
    audio.loop = true;
    audio.play();
    return audio;
  }

  getAudio(name) {
    return PIXI["audioManager"].getAudio(name);
  }

  mute() { this.muted = true; PIXI["sound"].muteAll(); }
  unmute() { this.muted = false; PIXI["sound"].unmuteAll(); }
}
