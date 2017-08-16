//import * as Loader from 'resource-loader';
import * as Rx from 'rxjs';
import * as PIXI from 'pixi.js';

export class PixiResourceAdapter {

    _loader;
    constructor() {
        this._loader = PIXI.loader;
    }

    preload(file){
        var self = this;
        return Rx.Observable.create(observer=>{
            this._loader
                .add(file)
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
                    .add(resources[file]["data"])
                    .load(function (loader, resources){});
            })    

            });
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