import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";

export class Sprite extends View {

    constructor(owner, params) {
        super(owner, params);
        const texture = PIXI.utils.TextureCache[params.source];
        this.view = new PIXI.Sprite(texture);
    }
}

GameObjectBuilder.getInstance().registerGameObject("Sprite", Sprite);
