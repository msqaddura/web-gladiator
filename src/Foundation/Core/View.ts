import { fromEvent } from "rxjs";
import { LayoutComponent } from "../../Component/LayoutComponent";
import { IHID } from "../../System/HID/IHID";
import { MathUtil } from "../../Util/MathUtil";
import { IView } from "./IView";
import { WGObject } from "./WGObject";
import { takeUntil } from "rxjs/operators";
export class View extends WGObject implements IView, IHID {
  _proxy = [
    "x",
    "y",
    "width",
    "height",
    "scaleX",
    "scaleY",
    "anchorX",
    "anchorY",
    "visible",
    "alpha",
    "interactive"
  ];
  globalLeft = 0;
  globalTop = 0;
  view;
  _interactive;
  _x = 0;
  _left = 0;
  _y = 0;
  _top = 0;
  _width = 0;
  _height = 0;
  _alpha = 1;
  _anchorX = 0;
  _anchorY = 0;
  _scaleX = 1;
  _scaleY = 1;
  _rotation = 0;
  _vfl = [""];
  layout = {
    name: null,
    left: "left",
    top: "top"
  };
  _autolayout;
  _registeredHIDEvents = {};
  _visible: boolean = true;
  views = {};
  params;
  subView;
  layoutComponent;
  readonly config: object;
  constructor(owner, params) {
    // tslint:disable-next-line:max-line-length
    super(owner, {
      name: params.name,
      blueprints: params.blueprints,
      repeatableBlueprints: params.repeatableBlueprints
    });
    this.config = params.config || {};
    this._vfl = params.vfl || this._vfl;
    if (params.layout) {
      this.layoutComponent = new LayoutComponent(this, params.layout);
    }
    // for (const key in params.layout)
    //    this.layout[key] = params.layout[key];// = Object.assign(this.layout, params.layout || {});
    this.params = params;
  }

  bootstrap(bootstrap) {
    if (bootstrap === false) {
      return;
    }

    this.preInitialize();
    this.initialize();
    this.executeStateMachine();
    this.preCreateTree();
    this.createTree();
    this.postCreateTree();
    this.listenToBusEvents();
    this.listenToHIDEvents(false);
    this.start();
  }

  listenToHIDEvents(isInteractive = true) {
    this.interactive = isInteractive || this.interactive;
  }

  preInitialize() {
    if (this.view) {
      this.view.name = this.name;
    }
    if (this.params.hasOwnProperty("width")) {
      this.width = this.params.width;
    }
    if (this.params.hasOwnProperty("height")) {
      this.height = this.params.height;
    }
    if (this.params.hasOwnProperty("visible")) {
      this.visible = this.params.visible;
    }
    if (this.params.hasOwnProperty("alpha")) {
      this.alpha = this.params.alpha;
    }
    if (this.params.hasOwnProperty("scaleX")) {
      this.scaleX = this.params.scaleX;
    }
    if (this.params.hasOwnProperty("scaleY")) {
      this.scaleY = this.params.scaleY;
    }
    if (this.params.hasOwnProperty("x")) {
      this.x = this.params.x;
    }
    if (this.params.hasOwnProperty("y")) {
      this.y = this.params.y;
    }
    if (this.params.hasOwnProperty("left")) {
      this.left = this.params.left;
    }
    if (this.params.hasOwnProperty("top")) {
      this.top = this.params.top;
    }
    if (this.params.hasOwnProperty("anchorX")) {
      this.anchorX = this.params.anchorX;
    }
    if (this.params.hasOwnProperty("anchorY")) {
      this.anchorY = this.params.anchorY;
    }
    if (this.params.hasOwnProperty("rotation")) {
      this.rotation = this.params.rotation;
    }
    if (this.params.hasOwnProperty("interactive")) {
      this.interactive = true;
    }

    if (this.params.hasOwnProperty("accessible")) {
      this.accessible = this.params.accessible;
    }
    if (this.params.hasOwnProperty("accessibleTitle")) {
      this.accessibleTitle = this.params.accessibleTitle;
    }

    if (this.params.hasOwnProperty("accessibleHint")) {
      this.accessibleHint = this.params.accessibleHint;
    }
    this.view.twin = this;
  }

  // use iterator or visitor
  updateLayout() {
    if (this.layoutComponent != null) {
      this.layoutComponent.update();
    }
    // if (this.layout.name != null) {
    //     let subView = LayoutSystem.getInstance().getSubView(this.layout.name)
    //     if (subView) {
    //         this.subView = subView;
    //         this.width = subView["width"];
    //         this.height = subView["height"];
    //         //if (this.layout.left != null)
    //             this.left = subView[this.layout.left] - (this.owner["globalLeft"] || 0);
    //         //if (this.layout.top != null)
    //             this.top = subView[this.layout.top] - (this.owner["globalTop"] || 0);
    //     }
    // }
    this.updateLayoutTree();
  }

  updateLayoutTree() {
    for (const key in this.views) {
      if (this.views.hasOwnProperty) {
        this.views[key].updateLayout();
      }
    }
  }

  // parseLayout(width, height, left, top) {

  //     this.width = width;
  //     this.height = height;
  //     this.left = left;
  //     this.top = top;
  //     this._autolayout = LayoutSystem.getInstance()
  //         .parseEVFL(this._vfl)
  //     this.parseTreeLayout();
  //     this.postLayout();

  // }
  // parseTreeLayout() {
  //     //TODO: save LayoutViews and dont update if it is the same
  //     const layoutViews = this._autolayout.setSize(this.width, this.height)
  //     for (const key in layoutViews.subViews) {
  //         const component = this.views[key];
  //         if (component) {
  //             const { width, height, left, top } = layoutViews.subViews[key];

  //             component.parseLayout(width, height, left, top);
  //         }
  //     }
  // }
  postLayout() {
    //
  }
  addNode(node) {
    super.addNode(node);
    if (node instanceof View) {
      this.addView(node);
    }
  }
  addView(aview: View) {
    this.views[aview.name] = aview;
    if (aview.view) {
      this.view.addChild(aview.view);
    } else {
      this.view.addChild(aview);
    }
  }

  registerHIDEvent(name: string) {
    this._registeredHIDEvents[name] = fromEvent(this.view, name);
    return this._registeredHIDEvents[name].pipe(takeUntil(this.isActive));
  }

  kill() {
    super.kill();
    this.view.twin = null;
    for (const key in this._registeredHIDEvents) {
      if (this._registeredHIDEvents.hasOwnProperty(key)) {
        // this._registeredHIDEvents[key].unsubscribe();
        delete this._registeredHIDEvents[key];
      }
    }
    this.view.parent.removeChild(this.view);
  }
  info() {
    const info = {
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height
    };
    const info2 = {
      Px: this.view.x,
      Py: this.view.y,
      Ph: this.view.height,
      Pw: this.view.width
    };
    console.info(this.name, info, info2);
    return info;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    value = MathUtil.toFixed(value);
    this.view.position.x = value + this.left;
    this._x = value;
  }

  get left() {
    return this._left;
  }
  set left(value) {
    // const gl = value - (this.owner["globalLeft"] || 0);
    value = MathUtil.toFixed(value);
    this.view.position.x = value + this.x;
    this.globalLeft = value + (this.owner["globalLeft"] || 0);
    this._left = value;
  }

  get y() {
    return this._y;
  }
  set y(value) {
    value = MathUtil.toFixed(value);
    this.view.position.y = value + this.top;
    this._y = value;
  }

  get top() {
    return this._top;
  }
  set top(value) {
    value = MathUtil.toFixed(value);
    this.view.position.y = value + this.y;
    this.globalTop = value + (this.owner["globalTop"] || 0);
    this._top = value;
  }

  get width() {
    return this._width;
  }
  set width(value) {
    value = MathUtil.toFixed(value);
    this.view.width = value;
    this._width = value;
  }

  get height() {
    return this._height;
  }
  set height(value) {
    value = MathUtil.toFixed(value);
    this.view.height = value;
    this._height = value;
  }

  get anchorX() {
    return this._anchorX;
  }
  set anchorX(value) {
    value = MathUtil.toFixed(value);
    this._anchorX = value;
    this.view.anchor.x = value;
  }

  get anchorY() {
    return this._anchorY;
  }
  set anchorY(value) {
    value = MathUtil.toFixed(value);
    this._anchorY = value;
    this.view.anchor.y = value;
  }

  get scaleX() {
    return this._scaleX;
  }
  set scaleX(value) {
    value = MathUtil.toFixed(value);
    this._scaleX = value;
    this.view.width = this.width * this._scaleX;
  }

  get scaleY() {
    return this._scaleY;
  }
  set scaleY(value) {
    value = MathUtil.toFixed(value);
    this._scaleY = value;
    this.view.height = this.height * this._scaleY;
  }

  get visible() {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    this.view.visible = value;
  }
  set interactive(value: boolean) {
    this._interactive = value;
    this.view.interactive = value;
    this.view.buttonMode = value;
  }
  get interactive() {
    return this._interactive;
  }

  set alpha(value) {
    value = MathUtil.toFixed(value);
    this._alpha = value;
    this.view.alpha = value;
  }
  get alpha() {
    return this._alpha;
  }

  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    this._rotation = value;
    this.view.rotation = value;
  }

  get tint() {
    return this.view.tint;
  }
  set tint(value) {
    this.view.tint = value;
  }

  get accessible() {
    return this.view.accessible;
  }
  set accessible(value) {
    this.view.accessible = value;
  }

  get accessibleTitle() {
    return this.view.accessibleTitle;
  }

  set accessibleTitle(value) {
    this.view.accessibleTitle = value;
    this.view._accessibleActive = false;
  }

  get accessibleHint() {
    return this.view.accessibleHint;
  }

  set accessibleHint(value) {
    this.view.accessibleHint = value;
  }
}
