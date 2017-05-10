
/*
* DEPRICATED
*/


import * as PIXI from 'pixi.js'

import { Entity } from './Entity';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class ScaleContainer extends Entity {
    $$$scaleOnly=true;
} 

GameObjectBuilder.getInstance().registerGameObject('ScaleContainer',ScaleContainer);
