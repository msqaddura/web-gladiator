import { Observable } from "rxjs";

export class ResourceSystem {
  static instance: ResourceSystem;
  static getInstance() {
    if (!this.instance) {
      this.instance = new ResourceSystem();
      // this.instance._adapter = new PixiResourceAdapter();
      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  _adapter;
  constructor() {
    //
  }
  use(adapter) {
    this._adapter = adapter;
  }
  preloadManifest(manifest) {
    return this._adapter.preloadManifest(manifest);
  }
  preload(file): Observable<number> {
    return this._adapter.preload(file);
  }
}
