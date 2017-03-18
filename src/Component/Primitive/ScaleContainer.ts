import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class ScaleContainer extends View {
    
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
    parseComponentsLayout() {
        if(!this.$$$scaleOnly)
            super.parseComponentsLayout();
        this.$$$scaleOnly = true;
    }
} 
