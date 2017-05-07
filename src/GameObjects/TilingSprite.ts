import * as PIXI from 'pixi.js'

import { GameObject } from '../Foundation/Core/GameObject';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class TilingSprite extends GameObject{
    
 constructor(owner, params){
     super(owner, params);
     var texture = PIXI.utils.TextureCache[params.source];
     this.$view = new PIXI.extras.TilingSprite(texture);
 }
} 

GameObjectBuilder.getInstance().registerGameObject('TilingSprite',TilingSprite);