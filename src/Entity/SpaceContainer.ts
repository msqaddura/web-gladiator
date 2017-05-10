
/*
* DEPRICATED
*/





import * as PIXI from 'pixi.js'

import { Entity } from './Entity';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class SpaceContainer extends Entity {
    $$$scaleOnly=false;
} 

GameObjectBuilder.getInstance().registerGameObject('SpaceContainer',SpaceContainer);