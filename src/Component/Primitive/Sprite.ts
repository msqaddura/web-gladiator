import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class Sprite extends View{
    
 constructor({owner,name,componentList,params,config,vfl=[""]}){
     super({owner,name,componentList,config,vfl});
     var texture = PIXI.utils.TextureCache["images/bunny.png"];
     this.$view = new PIXI.Sprite(texture);
 }
} 
