import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { VirtualView } from '../Base/VirtualView';

export class Application extends VirtualView{
 _application;
 canvas;
 renderer;
 constructor(owner=null,params){
     super(owner, params);
     this._application = new PIXI.Application(window.innerWidth,window.innerHeight);
     this.renderer = this._application.renderer;
     this.canvas = this._application.view;
     this.$view = this._application.stage; 
     this.$view.height = window.innerHeight;
     this.$view.width = window.innerWidth;
     this.$x = 0;
     this.$y = 0;
 }
} 
