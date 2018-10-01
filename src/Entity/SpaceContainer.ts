
/*
* DEPRICATED
*/

import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { Entity } from "./Entity";

export class SpaceContainer extends Entity {
    $$$scaleOnly = false;
}

GameObjectBuilder.getInstance().registerGameObject("SpaceContainer", SpaceContainer);
