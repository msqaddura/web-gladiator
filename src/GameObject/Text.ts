import * as PIXI from 'pixi.js'

import { View } from '../Foundation/Core/View';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class Text extends View {

    constructor(owner, params) {
        super(owner, params);

        this.$view = new PIXI.Text(params.text,params.options);
    }
} 

GameObjectBuilder.getInstance().registerGameObject('Text',Text);
