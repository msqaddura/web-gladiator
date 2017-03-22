import {SpaceContainer} from "./SpaceContainer"
import {ManifestLoader} from '../../Loader/ManifestLoader';
import { Bus } from '../../Communication/Bus';
export class Scene extends SpaceContainer{
 _manifest;
 _bus;
 constructor(owner, params,bootstrap){
     super(owner, params);
     this._manifest=params.manifest;
     this._scene=this;
     this._bus = new Bus();

     //ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));
     if(bootstrap)
        this.bootstrap();
}


 preloadAssits(loader,asset){
     console.info(loader,asset);
     //super.bootstrap();
 }

}