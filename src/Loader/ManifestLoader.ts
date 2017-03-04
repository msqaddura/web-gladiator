import * as Loader  from 'resource-loader';
export class ManifestLoader  {
    static instance: ManifestLoader;
    _loader;
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ManifestLoader();
            this.instance._loader = new Loader();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    preload(manifest,cb){
        this._loader
            .add(manifest)
            .load(cb);

    }

    preloadAssits(loader,assets){
      console.info(loader,assets);
    }
}