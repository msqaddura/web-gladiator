import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";

export class Graphics extends View {
    view: PIXI.Graphics;
    constructor(owner, params) {
        super(owner, params);
        this.view = new PIXI.Graphics();

    }
    lineStyle(lineWidth = 4, color = 0x00FF00, alpha = 1) {
        return this.view.lineStyle(lineWidth, color, alpha);
    }
    moveTo(x, y) {
        return this.view.moveTo(x, y);
    }
    endFill() {
        return this.view.endFill();
    }
    lineTo(x, y) {
        return this.view.lineTo(x, y);
    }
    clear() {
        return this.view.clear();
    }
}

GameObjectBuilder.getInstance().registerGameObject("Graphics", Graphics);
