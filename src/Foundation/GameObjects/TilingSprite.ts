import * as PIXI from 'pixi.js'

import { Entity } from '../Core/Entity';
import { GameObjectBuilder } from '../Builder/GameObjectBuilder';

export class TilingSprite extends Entity{
    
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     var texture = PIXI.utils.TextureCache[params.source];
     this.$view = new PIXI.extras.TilingSprite(texture);
     
     this.bootstrap(bootstrap);
 }
} 

GameObjectBuilder.getInstance().registerGameObject('TilingSprite',TilingSprite);