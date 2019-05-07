import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { System } from "../System";

export class LayoutSystem {
  static getInstance() {
    if (!this.instance) {
      this.instance = new LayoutSystem();

      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  private static instance: LayoutSystem;
  adapter;
  layout;
  width;
  height;
  layouts = {};
  private constructor() {
    // do something construct...
    // this.layoutAdapter = new AutoLayoutAdapter();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    fromEvent(window, "resize")
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.updateLayoutSize();
        this.iterateTree();
      });
  }
  parseLayout(vfl, name) {
    // this._layout = this._adapter.parseEVFL(vfl);
    this.layouts[name] = this.adapter.parseEVFL(vfl);
    this.updateLayoutSize();
  }
  updateLayoutSize() {
    for (const key in this.layouts) {
      if (this.layouts.hasOwnProperty(key)) {
        this.layouts[key].setSize(this.width, this.height);
      }
    }
    // this._layout.setSize(this._width, this._height);
  }
  getSubView(name) {
    const result = null;
    for (const key in this.layouts) {
      if (this.layouts[key].subViews[name]) {
        return this.layouts[key].subViews[name];
      }
    }
    return result;
  }
  // use here visitor or iterator pattern
  // for now we are happy by Views taking care of themselves
  // remember visitor needs overloading and that is not allowed in typescript YET
  iterateTree() {
    System.getInstance().target.resize(this.width, this.height);
  }

  use(adapter) {
    this.adapter = adapter;
  }
  parseEVFL(vfl = [""]) {
    return this.adapter.parseEVFL(vfl);
  }
}
