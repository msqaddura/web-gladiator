import * as PIXI from 'pixi.js'

import { GameObject } from '../Foundation/Core/GameObject';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class Text extends GameObject {

    constructor(owner, params) {
        super(owner, params);

        this.$view = new PIXI.Text(params.text,params.options);
    }
} 

GameObjectBuilder.getInstance().registerGameObject('Text',Text);
