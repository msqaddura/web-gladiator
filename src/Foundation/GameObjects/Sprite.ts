import * as PIXI from 'pixi.js'

import { Entity } from '../Core/Entity';
import { GameObjectBuilder } from '../Builder/GameObjectBuilder';

export class Sprite extends Entity{
    
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     var texture = PIXI.utils.TextureCache[params.source];
     this.$view = new PIXI.Sprite(texture);
     
     this.bootstrap(bootstrap);
 }
} 

GameObjectBuilder.getInstance().registerGameObject('Sprite',Sprite);