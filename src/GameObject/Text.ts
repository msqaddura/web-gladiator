import * as PIXI from 'pixi.js'

import { View } from '../Foundation/Core/View';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class Text extends View {

    constructor(owner, params) {
        super(owner, params);

        this.view = new PIXI.Text(params.text,params.options);
    }

    updateLayout(){
        super.updateLayout();
        this.postLayout();
    }
    postLayout(){
        let min = Math.min(this.view.scale.x,this.view.scale.y)
        this.view.scale.set(min)
    }
    get text(){
        return this.view.text;
    }
    set text(value){
        this.view.text=value;
    }
} 

GameObjectBuilder.getInstance().registerGameObject('Text',Text);
