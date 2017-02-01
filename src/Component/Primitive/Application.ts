import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class Application extends View{
 _application;
 canvas;
 constructor({owner=null,name="app",componentList={},config={},vfl=[""]}){
     super({owner,name,componentList,config,vfl});
     this._application = new PIXI.Application();
     this.canvas = this._application.view;
     this.$view = this._application.stage; 
 }
} 
