import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { VirtualEntity } from '../Base/VirtualEntity';

export class Container extends VirtualEntity {
    
 constructor(owner, params,bootstrap=false){
     super(owner,params);
     this.$view = new PIXI.Container();
     
     this.bootstrap(bootstrap);
 }
} 
