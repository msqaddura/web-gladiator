import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";

import { AnimatedSprite as $AnimatedSprite, Texture } from "pixi.js";
import { View } from "../Foundation/Core/View";

export class AnimatedSprite extends View {

    constructor(owner, params) {
        super(owner, params);
        const frames = [];
        params.frameList.forEach((frame) => {
            for (let i = frame.start; i <= frame.end; i++) {
                const val = i < 10 ? "0" + i : i; // TODO:use MathUtil
                frames.push(Texture.from(`${frame.prefix}${val}${frame.postfix}`));
            }
        });

        this.view = new $AnimatedSprite(frames);

    }
    play() {
        this.view.play();
    }
    pause() {
        this.view.pause();
    }
    stop() {
        this.view.stop();
    }
    gotoAndStop(frameNumber = 0) {
        this.view.gotoAndStop(frameNumber);
    }
}

GameObjectBuilder.getInstance().registerGameObject("AnimatedSprite", AnimatedSprite);
