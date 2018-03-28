import * as PIXI from "pixi.js";
import * as Rx from "rxjs";
PIXI["default"] = PIXI;
PIXI["utils"].skipHello();
const Resource = PIXI.loaders.Resource;
Resource.setExtensionLoadType("wav", Resource.LOAD_TYPE.XHR);
Resource.setExtensionLoadType("mp3", Resource.LOAD_TYPE.XHR);
Resource.setExtensionLoadType("ogg", Resource.LOAD_TYPE.XHR);
Resource.setExtensionLoadType("webm", Resource.LOAD_TYPE.XHR);
import * as PixiAudio from "pixi-audio";
export class PixiAudioAdapter  {

    constructor() {
        console.log(":)" || PixiAudio);
    }
    play(name) {
        PIXI["audioManager"].getAudio(name).play();
    }
}
