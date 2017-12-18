// import * as Loader from 'resource-loader';
import * as PIXI from "pixi.js";
import * as Rx from "rxjs";

export class PixiResourceAdapter {

    loader;
    constructor() {
        this.loader = PIXI.loader;
    }

    preload(file) {
        return Rx.Observable.create((observer) => {
            this.loader
                .add(file)
                .load((loader, resources) => {
                    loader.progress = 0;
                    loader.onProgress.add((loader, resource) => {
                        // console.info(loader.progress);
                        observer.next(loader.progress);
                    });
                    loader.onComplete.add((loader, resObj) => {
                        // console.info(loader.progress)
                        observer.complete();
                    });
                    loader
                        .add(resources[file]["data"])
                        .load((loader, resources) => { });
                });

        });
    }
    preloadManifest(manifest, cb) {
        return Rx.Observable.create((observer) => {
            this.loader
                .add(manifest)
                .load((loader, resources) => {
                    loader.progress = 0;
                    loader.onProgress.add((loader, resource) => {
                        // console.info(loader.progress);
                        observer.next(loader.progress);
                    });
                    loader.onComplete.add((loader, resObj) => {
                        // console.info(loader.progress)
                        observer.complete();
                    });
                    loader
                        .add(resources[manifest]["data"])
                        .load((loader, resources) => { });
                });

        });
    }

}
