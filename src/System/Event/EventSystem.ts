//extends Facade
export class EventSystem {
  static getInstance() {
    if (!this.instance) {
      this.instance = new EventSystem();
      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  private static instance: EventSystem;
  _adapter;
  private constructor() {
    // do something construct...
    //this._adapter = new Bus();
  }

  use(adapter) {
    this._adapter = adapter;
  }
  registerEvent(ctor) {
    return this._adapter.registerEvent(ctor);
  }
  sendEvent(obj) {
    // RODO: rename to dispatchEvent
    this._adapter.sendEvent(obj);
  }
}

export const eventSystem = EventSystem.getInstance();
