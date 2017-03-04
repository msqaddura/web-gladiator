import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class Sprite extends View{
    
 constructor(owner, params,bootstrap){
     super(owner, params);
     var texture = PIXI.utils.TextureCache[params.source];
     this.$view = new PIXI.Sprite(texture);
     if(bootstrap)
        this.bootstrap();
 }
} 
