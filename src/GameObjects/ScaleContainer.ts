import * as PIXI from 'pixi.js'

import { Entity } from './Entity';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class ScaleContainer extends Entity {
    

    get $width() {
        return this._width;
    }
    set $width(value) {
        if(this.$$$scaleOnly)
            this.$view.width = value;
        this._width = value;
    }

    get $height() {
        return this._height;
    }
    set $height(value) {
        if(this.$$$scaleOnly)
            this.$view.height = value;
        this._height = value;
    }
    parseTreeLayout() {
        if(!this.$$$scaleOnly)
            super.parseTreeLayout();
        this.$$$scaleOnly = true;
    }
} 

GameObjectBuilder.getInstance().registerGameObject('ScaleContainer',ScaleContainer);