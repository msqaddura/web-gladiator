import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class TilingSprite extends View{
    
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     var texture = PIXI.utils.TextureCache[params.source];
     this.$view = new PIXI.extras.TilingSprite(texture);
     
     this.bootstrap(bootstrap);
 }
} 
