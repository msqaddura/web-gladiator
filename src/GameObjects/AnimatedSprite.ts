import * as PIXI from 'pixi.js'

import { GameObject } from '../Foundation/Core/GameObject';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class AnimatedSprite extends GameObject {

    constructor(owner, params) {
        super(owner, params);
        var frames = [];
        params.frameList.forEach(bag => {
            for (let i = bag.start; i <= bag.end; i++) {
                var val = i < 10 ? '0' + i : i;//TODO:use MathUtil
                frames.push(PIXI.Texture.fromFrame(`${bag.prefix}${val}${bag.postfix}`));
            }
        });

        this.$view = new PIXI.extras.AnimatedSprite(frames);
        
    }
    play() {
        this.$view.play();
    }
    pause() {
        this.$view.pause();
    }
    stop() {
        this.$view.stop();
    }
    gotoAndStop(frameNumber=0){
        this.$view.gotoAndStop(frameNumber)
    }
} 

GameObjectBuilder.getInstance().registerGameObject('AnimatedSprite',AnimatedSprite);
