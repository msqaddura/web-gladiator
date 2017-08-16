export class ResourceSystem  {
    static instance: ResourceSystem;
    _adapter;
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ResourceSystem();
            //this.instance._adapter = new PixiResourceAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    use(adapter){
        this._adapter = adapter;
    }
    preloadManifest(manifest){
      return this._adapter.preloadManifest(manifest);
    }
    preload(file){
        return this._adapter.preload(file);
    }
}