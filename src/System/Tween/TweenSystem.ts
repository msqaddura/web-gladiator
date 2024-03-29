// shouldnt this be animation system
export class TweenSystem {
  static getInstance() {
    if (!this.instance) {
      this.instance = new TweenSystem();
      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  private static instance: TweenSystem;
  _adapter = null;
  private constructor() {
    // do something construct...
  }
  use(adapter) {
    this._adapter = adapter;
  }
  fadeIn(target, duration = 200) {
    return this._adapter.fadeIn(target, duration);
  }
  fadeOut(target, duration = 200) {
    return this._adapter.fadeOut(target, duration);
  }
  createNew(bag) {
    // console.info(this);
    return this._adapter.createNew(bag);
  }
  create(bag) {
    // console.info(this);
    return this._adapter.create(bag);
  }
}

export const tweenSystem = TweenSystem.getInstance();
