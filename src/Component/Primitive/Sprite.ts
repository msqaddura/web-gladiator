import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { Entity } from '../Base/Entity';

export class Sprite extends Entity{
    
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     var texture = PIXI.utils.TextureCache[params.source];
     this.$view = new PIXI.Sprite(texture);
     
     this.bootstrap(bootstrap);
 }
} 
