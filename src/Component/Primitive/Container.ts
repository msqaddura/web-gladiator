import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { VirtualView } from '../Base/VirtualView';

export class Container extends VirtualView {
    
 constructor(owner, params,bootstrap=false){
     super(owner,params);
     this.$view = new PIXI.Container();
     
     if(bootstrap)
        this.bootstrap();
 }
} 
