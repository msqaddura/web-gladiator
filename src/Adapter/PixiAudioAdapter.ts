import * as PixiAudio from 'pixi-audio';
import * as Rx from 'rxjs';


export class PixiAudioAdapter  {

    constructor() {
        
        console.info(PixiAudio)
    }
    play(name){
        PIXI["audioManager"].getAudio(name).play();
    }
}