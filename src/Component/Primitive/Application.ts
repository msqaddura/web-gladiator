import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class Application extends View{
 _application;
 _stage;
 constructor(owner,...paramsArr){
     super(owner,paramsArr[0]);
 }

 createView(){
     this._application = new PIXI.Application();
     this._view = this._application.view;
     this._stage = this._application.stage;
 }
 addView(component){
     this._stage.addChild(component._view);
 }
} 
