import * as PIXI from 'pixi.js'

import { Entity } from './Entity';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class SpaceContainer extends Entity {
    
} 

GameObjectBuilder.getInstance().registerGameObject('SpaceContainer',SpaceContainer);