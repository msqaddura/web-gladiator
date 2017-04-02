
import { PixiResourceAdapter } from './PixiResourceAdapter';
export class ResourceFacade  {
    static instance: ResourceFacade;
    _resourceAdapter;
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ResourceFacade();
            this.instance._resourceAdapter = new PixiResourceAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }

    preloadManifest(manifest,cb){
      this._resourceAdapter.preloadManifest(manifest,cb);
    }
    
}