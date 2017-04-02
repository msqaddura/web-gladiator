import * as PIXI from 'pixi.js'

import { Entity } from '../Core/Entity';

export class SpaceContainer extends Entity {
    
 constructor(owner, params,bootstrap=false){
     super(owner,params);
     this.$view = new PIXI.Container();
     
     this.bootstrap(bootstrap);
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
