//import * as Loader from 'resource-loader';
import * as Rx from 'rxjs';
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
        return Rx.Observable.create(observer=>{
            this._loader
                .add(manifest)
                .load(function (loader, resources) {
                    loader.progress = 0;
                    loader.onProgress.add(function(loader,resource){
                        //console.info(loader.progress);
                        observer.next(loader.progress);
                    })
                    loader.onComplete.add(function(loader,resObj){
                        //console.info(loader.progress)
                        observer.complete();
                    })
                    loader
                    .add(resources[manifest]["data"])
                    .load(function (loader, resources){});
            })    

            });
    }

}