import { Bus } from '../../Engine/Communication/Bus';

import {SpaceContainer} from "./SpaceContainer";
import { GameObjectBuilder } from '../Builder/GameObjectBuilder';

export class Scene extends SpaceContainer{
 _manifest;

 constructor(owner, params,bootstrap=false){
     super(owner, params);
     this._manifest=params.manifest;
     //ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));
     
        this.bootstrap(bootstrap);
}


 preloadAssits(loader,asset){
     console.info(loader,asset);
     //super.bootstrap();
 }

}

GameObjectBuilder.getInstance().registerGameObject('Scene',Scene);