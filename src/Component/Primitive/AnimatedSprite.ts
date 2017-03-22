import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';


export class AnimatedSprite extends View {

    constructor(owner, params, bootstrap = false) {
        super(owner, params);
        var frames = [];
        params.frameList.forEach(bag => {
            for (let i = bag.start; i <= bag.end; i++) {
                var val = i < 10 ? '0' + i : i;//TODO:use MathUtil
                frames.push(PIXI.Texture.fromFrame(`${bag.prefix}${val}${bag.postfix}`));
            }
        });

        this.$view = new PIXI.extras.AnimatedSprite(frames);
        this.bootstrap(bootstrap);
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
} 
