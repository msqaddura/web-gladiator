
import {SpaceContainer} from "./SpaceContainer";
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';

export class Scene extends SpaceContainer{
 _manifest;
 _blueprint
 constructor(owner, params){
     super(owner, params);
     this._manifest=params.manifest;
     this._blueprint=params.blueprint;
     //ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));
     
    
}

    load(){
        
    }
    show(){

    }
    hide(){

    }

}

GameObjectBuilder.getInstance().registerGameObject('Scene',Scene);