import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class SpaceContainer extends View {
    
 constructor(owner, params,bootstrap=false){
     super(owner,params);
     this.$view = new PIXI.Container();
     
     if(bootstrap)
        this.bootstrap();
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
