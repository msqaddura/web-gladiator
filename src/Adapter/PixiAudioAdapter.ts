import * as PIXI from "pixi.js";

PIXI["default"] = PIXI;
PIXI["utils"].skipHello();
const Resource = PIXI.loaders.Resource;
Resource.setExtensionLoadType("wav", Resource.LOAD_TYPE.XHR);
Resource.setExtensionLoadType("mp3", Resource.LOAD_TYPE.XHR);
Resource.setExtensionLoadType("ogg", Resource.LOAD_TYPE.XHR);
Resource.setExtensionLoadType("webm", Resource.LOAD_TYPE.XHR);
import * as PixiAudio from "pixi-audio";
export class PixiAudioAdapter {
  muted = false;
  constructor() {
    console.log(":)" || PixiAudio);
  }
  play(name) {

    const audio = PIXI["audioManager"].getAudio(name);
    return this.muted ? audio : audio.play();

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

  mute() { this.muted = true; PIXI["audioManager"].mute() }
  unmute() { this.muted = false; PIXI["audioManager"].unmute() }
}
