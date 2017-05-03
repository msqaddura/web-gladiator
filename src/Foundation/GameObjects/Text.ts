import * as PIXI from 'pixi.js'

import { Entity } from '../Core/Entity';
import { GameObjectBuilder } from '../Builder/GameObjectBuilder';

export class Text extends Entity {

    constructor(owner, params, bootstrap = false) {
        super(owner, params);

        this.$view = new PIXI.Text(params.text,params.options);
        this.bootstrap(bootstrap);
    }
} 

GameObjectBuilder.getInstance().registerGameObject('Text',Text);
