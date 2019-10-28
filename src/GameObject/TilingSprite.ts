import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";

export class TilingSprite extends View {
  constructor(owner, params) {
    super(owner, params);
    const texture = PIXI.Texture.from(params.source);
    this.view = new PIXI.TilingSprite(texture);
  }

  preInitialize() {
    super.preInitialize();
    if (this.params.hasOwnProperty("tileScaleX")) {
      this.tileScaleX = this.params.tileScaleX;
    }
    if (this.params.hasOwnProperty("tileScaleY")) {
      this.tileScaleY = this.params.tileScaleY;
    }
  }
  get tileScaleX() {
    return this.view.tileScale.x;
  }
  set tileScaleX(value: number) {
    this.view.tileScale.x = value;
  }

  get tileScaleY() {
    return this.view.tileScale.y;
  }
  set tileScaleY(value: number) {
    this.view.tileScale.y = value;
  }
}

GameObjectBuilder.getInstance().registerGameObject(
  "TilingSprite",
  TilingSprite
);
