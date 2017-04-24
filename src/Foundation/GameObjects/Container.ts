import * as PIXI from 'pixi.js'

import { VirtualEntity } from '../Core/VirtualEntity';
import { GameObjectBuilder } from '../Builder/GameObjectBuilder';

export class Container extends VirtualEntity {
    
 constructor(owner, params,bootstrap=false){
     super(owner,params);
     this.$view = new PIXI.Container();
     
     this.bootstrap(bootstrap);
 }
} 

GameObjectBuilder.getInstance().registerGameObject('Container',Container);