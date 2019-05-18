import * as PIXI from "pixi.js";

import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { View } from "../Foundation/Core/View";
import { MathUtil } from "../Util/MathUtil";
export class Entity extends View {
  $$$scaleOnly = false;
  $$$visited = false;
  constructor(owner, params) {
    super(owner, params);
    this.view = new PIXI.Container();
  }

  preInitialize() {
    super.preInitialize();
    this.$$$scaleOnly = !!this.params["scaleOnly"];
  }
  get width() {
    return this._width;
  }

  set width(value) {
    value = MathUtil.toFixed(value);
    if (this.$$$scaleModeActive) {
      //this.view.width =value;
      this.view.scale.x = value / (this.view.width / this.view.scale.x);
      this.anchorX = this.anchorX;
    }
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    value = MathUtil.toFixed(value);
    if (this.$$$scaleModeActive) {
      //this.view.height = value
      this.view.scale.y = value / (this.view.height / this.view.scale.y);
      this.anchorY = this.anchorY;
    }
    this._height = value;
  }

  get anchorX() {
    return this._anchorX;
  }

  set anchorX(value) {
    this._anchorX = value;
    this.view.pivot.x = (this.view.width / this.view.scale.x) * value;
  }

  get anchorY() {
    return this._anchorY;
  }

  set anchorY(value) {
    this._anchorY = value;
    this.view.pivot.y = (this.view.height / this.view.scale.y) * value;
  }
  // parseTreeLayout() {
  //     if(!this.$$$scaleModeActive)
  //         super.parseTreeLayout();
  //     this.$$$visited = true;
  // }

  updateLayoutTree() {
    this.preUpdateLayoutTree();
    if (!this.$$$scaleModeActive) {
      super.updateLayoutTree();
    }
    this.$$$visited = true;
    this.anchorX = this.anchorX;
    this.anchorY = this.anchorY;
    this.width = this.width;
    this.height = this.height;
    this.postUpdateLayoutTree();
  }

  get $$$scaleModeActive() {
    return this.$$$visited && this.$$$scaleOnly;
  }
}

GameObjectBuilder.getInstance().registerGameObject("Entity", Entity);
