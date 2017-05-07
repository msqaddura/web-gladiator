import * as PIXI from 'pixi.js'

import { GameObject } from '../Foundation/Core/GameObject';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class Entity extends GameObject {
$$$scaleOnly = false;
 constructor(owner, params){
     super(owner,params);
     this.$view = new PIXI.Container();
 }
     get $width() {
        return this._width;
    }
    set $width(value) {
        this._width = value;
    }

    get $height() {
        return this._height;
    }
    set $height(value) {
        this._height = value;
    }
} 

GameObjectBuilder.getInstance().registerGameObject('Entity',Entity);