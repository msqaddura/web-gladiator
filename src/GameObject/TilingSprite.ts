import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";

export class TilingSprite extends View {

    constructor(owner, params) {
        super(owner, params);
        const texture = PIXI.utils.TextureCache[params.source];
        this.view = new PIXI.extras.TilingSprite(texture);
    }
}

GameObjectBuilder.getInstance().registerGameObject("TilingSprite", TilingSprite);
