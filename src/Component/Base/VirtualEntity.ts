import * as PIXI from 'pixi.js'

import { Component } from '../Base/Component';
import { Entity } from '../Base/Entity';

export class VirtualEntity extends Entity{
    
 constructor(owner,params,bootstrap=false){
     super(owner,params);
    
     this.bootstrap(bootstrap);
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
