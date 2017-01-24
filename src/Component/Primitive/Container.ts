import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class Container extends View{
    
 constructor(owner,...paramsArr){
     super(owner,paramsArr[0]);
 }

 createView(){
     this._view = new PIXI.Container();
 }
} 
