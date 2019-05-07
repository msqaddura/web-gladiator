// import * as Loader from 'resource-loader';
import * as PIXI from "pixi.js";
import { Observable } from "rxjs";

export class PixiResourceAdapter {
  loader;
  constructor() {
    this.loader = PIXI.loader;
  }

  preload(file) {
    return new Observable(observer => {
      this.loader.add(file).load((loader, resources) => {
        loader.progress = 0;
        loader.onProgress.add((loader, resource) => {
          // console.info(loader.progress);
          observer.next(loader.progress);
        });
        loader.onComplete.add((loader, resObj) => {
          // console.info(loader.progress)
          observer.complete();
        });
        loader.add(resources[file]["data"]).load((loader, resources) => {});
      });
    });
  }
  preloadManifest(manifest, cb) {
    return new Observable(observer => {
      this.loader.add(manifest).load((loader, resources) => {
        loader.progress = 0;
        loader.onProgress.add((loader, resource) => {
          // console.info(loader.progress);
          observer.next(loader.progress);
        });
        loader.onComplete.add((loader, resObj) => {
          // console.info(loader.progress)
          observer.complete();
        });
        loader.add(resources[manifest]["data"]).load((loader, resources) => {});
      });
    });
  }
}
