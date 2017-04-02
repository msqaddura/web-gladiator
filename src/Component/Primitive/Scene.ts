import {SpaceContainer} from "./SpaceContainer"
import {ManifestLoader} from '../../Loader/ManifestLoader';
import { Bus } from '../../Engine/Communication/Bus';
export class Scene extends SpaceContainer{
 _manifest;
 _bus;
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     this._manifest=params.manifest;
     this._scene=this;
     this._bus = new Bus();

     //ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));
     
        this.bootstrap(bootstrap);
}


 preloadAssits(loader,asset){
     console.info(loader,asset);
     //super.bootstrap();
 }

}