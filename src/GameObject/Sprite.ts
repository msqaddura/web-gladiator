import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";

export class Sprite extends View {
  constructor(owner, params) {
    super(owner, params);
    const texture = PIXI.Texture.EMPTY;
    //PIXI.utils.TextureCache[params.fromImage];

    this.view = new PIXI.Sprite(texture);
    this.view.twin = this;
  }

  preInitialize() {
    super.preInitialize();
    if (this.params.hasOwnProperty("fromImage")) {
      this.view.texture = PIXI.Texture.from(this.params.fromImage);
    }
  }

  set fromImage(value) {
    this.view.texture = PIXI.Texture.from(value);
  }
  get fromImage() {
    return this.view.texture;
  }
}

GameObjectBuilder.getInstance().registerGameObject("Sprite", Sprite);
