import * as PIXI from 'pixi.js'

import { View } from '../Foundation/Core/View';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';
const setIntervalX = (callback, onDone, delay, repetitions) => {
    var x = 0;
    var intervalID = window.setInterval(function () {

        callback(x);

        if (++x === repetitions) {
            onDone();
            window.clearInterval(intervalID);
        }
    }, delay);
}
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
        let min = Math.min(this.view.scale.x, this.view.scale.y)
        //this.view.scale.set(min)
    }
    get text() {
        return this.view.text;
    }
    set text(value) {
        if (value == this.view.text) return;
        setIntervalX((x) => { 
            this.view.text = value.slice(0,x)+"|";
        }, ()=>{
            this.view.text = value; 
        },
         50,
         value.length)
        //this.view.text = value;
        this.updateLayout();
    }
}

GameObjectBuilder.getInstance().registerGameObject('Text', Text);
