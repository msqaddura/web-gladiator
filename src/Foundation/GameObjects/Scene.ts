import { Bus } from '../../Engine/Communication/Bus';
import { SceneManager } from '../../Foundation/Manager/SceneManager';
import { ResourceFacade } from '../../Engine/Resource/ResourceFacade';
import {SpaceContainer} from "./SpaceContainer";
import { GameObjectBuilder } from '../Builder/GameObjectBuilder';

export class Scene extends SpaceContainer{
 _manifest;
 _blueprint
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     this._manifest=params.manifest;
     this._blueprint=params.blueprint;
     //ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));
     
    this.bootstrap(bootstrap);
}


preload(){
    return ResourceFacade.getInstance().preloadManifest(this._manifest);
}
load(){
    this.bootstrap(true);
}
show(){

}
hide(){

}
 preloadAssits(loader,asset){
     console.info(loader,asset);
     //super.bootstrap();
 }

}

GameObjectBuilder.getInstance().registerGameObject('Scene',Scene);