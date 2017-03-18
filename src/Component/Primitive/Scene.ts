import {SpaceContainer} from "./SpaceContainer"
import {ManifestLoader} from '../../Loader/ManifestLoader';
export class Scene extends SpaceContainer{
 _manifest;
 constructor(owner, params,bootstrap){
     super(owner, params);
     this._manifest=params.manifest;
     //ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));
     if(bootstrap)
        this.bootstrap();
}


 preloadAssits(loader,asset){
     console.info(loader,asset);
     //super.bootstrap();
 }

}