import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";

export class Sprite extends View {
  _fromImage: string;
  constructor(owner, params) {
    super(owner, params);
    const texture = PIXI.Texture.from(this.params.source || this.params.fromImage);

    this.view = new PIXI.Sprite(texture);
    this.view.twin = this;
  }

  preInitializeXX() {
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

  get scaleX() {
    return this.view.scale.x;
  }
  set scaleX(value) {
    this.view.scale.x = value;
  }

  get scaleY() {
    return this.view.scale.y;
  }
  set scaleY(value) {
    this.view.scale.y = value;
  }
}

GameObjectBuilder.getInstance().registerGameObject("Sprite", Sprite);
