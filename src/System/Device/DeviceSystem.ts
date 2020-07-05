export class DeviceSystem {
  static getInstance() {
    if (!this.instance) {
      this.instance = new DeviceSystem();
      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  private static instance: DeviceSystem;
  _adapter = null;
  private constructor() {
    // do something construct...
  }
  use(adapter) {
    this._adapter = adapter;
  }
  getResizeObs() {
    return this._adapter.getResizeObs();
  }

  isMobile() {
    return true;
  }
}

export let deviceSystem = DeviceSystem.getInstance();
