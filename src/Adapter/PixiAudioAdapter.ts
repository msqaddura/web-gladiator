import * as PIXI from "pixi.js";
import SOUND from "pixi-sound";

PIXI["s" + "o" + "u" + "n" + "d"] = SOUND;

console.log(SOUND);
export class PixiAudioAdapter {
  muted = false;
  constructor() {}
  play(name) {
    return PIXI["sound"].play(name);
  }

  loop(name) {
    const audio = PIXI.sound.find(name);
    audio.loop = true;
    audio.play();
    return audio;
  }

  getAudio(name) {
    return PIXI.sound.find(name);
  }

  mute() {
    this.muted = true;
    PIXI["sound"].muteAll();
  }
  unmute() {
    this.muted = false;
    PIXI["sound"].unmuteAll();
  }
}
