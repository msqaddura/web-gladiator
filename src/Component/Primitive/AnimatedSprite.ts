import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class AnimatedSprite extends View {

    constructor({owner, name, componentList, params, config, vfl = [""]}) {
        super({ owner, name, componentList, config, vfl });
        var frames = [];
        for (var i = 0; i < 30; i++) {
            var val = i < 10 ? '0' + i : i;

            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
        }
        this.$view = new PIXI.extras.AnimatedSprite(frames);;
    }
} 
