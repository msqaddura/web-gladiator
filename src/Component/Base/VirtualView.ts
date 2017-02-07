import * as PIXI from 'pixi.js'

import { Component } from '../Base/Component';
import { View } from '../Base/View';

export class VirtualView extends View{
    
 constructor({owner,name,componentList,config,vfl=[""]}){
     super({owner,name,componentList,config,vfl});
 }

  set $width(value){
     this._width = value;
 }
 get $width(){
     return this._width;
 }
set $height(value){
     this._height = value;
 }
 get $height(){
     return this._height;
 }
} 
