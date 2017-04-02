//import * as Loader from 'resource-loader';
export class PixiResourceAdapter {

    _loader;
    constructor() {
        this._loader = PIXI.loader;
    }

    preload(manifest, cb) {
        this._loader
            .add(manifest)
            .load(cb);

    }

    preloadManifest(manifest, cb) {
        var self = this;
        this._loader
            .add(manifest)
            .load(function (loader, resources) {
                self._loader
                    .add(resources[manifest]["data"])
                    .load(cb)
            });
    }

}