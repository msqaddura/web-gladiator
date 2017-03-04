import {Container} from "./Container"
import {ManifestLoader} from '../../Loader/ManifestLoader';
export class Scene extends Container{
 _manifest;
 constructor(owner, params){
     super(owner, params);
     this._manifest=params.manifest;
     ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));
    }


 preloadAssits(loader,asset){
     console.info(loader,asset);
     //super.bootstrap();
 }
 bootstrap(){}
 _preload(manifest){
     ManifestLoader
 }
}