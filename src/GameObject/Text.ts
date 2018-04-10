import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";
const setIntervalX = (callback, onDone, delay, repetitions) => {
    let x = 0;
    const intervalID = window.setInterval(() => {

        callback(x);

        if (++x === repetitions) {
            onDone();
            window.clearInterval(intervalID);
        }
    }, delay);
};
export class Text extends View {

    constructor(owner, params) {
        super(owner, params);

        this.view = new PIXI.Text(params.text, params.options);
    }

    updateLayout() {
        super.updateLayout();
        this.postLayout();
    }
    postLayout() {
        const min = Math.min(this.view.scale.x, this.view.scale.y);
        // this.view.scale.set(min)
    }
    get text() {
        return this.view.text;
    }
    set text(value) {
        // if (value == this.view.text) return;
        // setIntervalX((x) => {
        //     this.view.text = value.slice(0,x)+"|";
        // }, ()=>{
        //     this.view.text = value;
        // },
        //  50,
        //  value.length)
        this.view.text = value;
        this.updateLayout();
    }
}

GameObjectBuilder.getInstance().registerGameObject("Text", Text);
