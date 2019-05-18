import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";

export class Sprite extends View {
  _fromImage: string;
  constructor(owner, params) {
    super(owner, params);
    const texture = PIXI.Texture.EMPTY;
    //PIXI.utils.TextureCache[params.fromImage];

    this.view = new PIXI.Sprite(texture);
    this.view.twin = this;
  }

  preInitialize() {
    if (this.params.hasOwnProperty("fromImage")) {
      this.view.texture = PIXI.Texture.from(this.params.fromImage);
    }
    super.preInitialize();
  }

  set fromImage(value) {
    this.view.texture = PIXI.Texture.from(value);
    this.fromImage = value;
  }
  get fromImage() {
    return this._fromImage;
  }
}

GameObjectBuilder.getInstance().registerGameObject("Sprite", Sprite);
