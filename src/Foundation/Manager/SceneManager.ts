import { Engine } from '../../Engine/Engine';
import { BlueprintBuilder} from '../../Foundation/Builder/BlueprintBuilder';
/**
 * What have I done? 
 * REFACTOR EVERY SINGLE LINE OF CODE... although function names are right
 */
export class SceneManager {
    private static instance: SceneManager;
    
    _sceneMap={};
    _target;
    _activeScene;
    static getInstance() {
        if (!this.instance) {
            this.instance = new SceneManager();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    
    setTarget(target){
        this._target = target;
        this._sceneMap = target.sceneMap;
    }
    registerScene(name,scene){
        this._sceneMap[name]=scene;
    }
    getScene(name){
        return this._sceneMap[name];
    }
    preloadScene(name:string) {  
         return Engine.getInstance().getSystem("resource").preloadManifest(this._sceneMap[name].manifest);
    }
    
    switchScenesTo(inScene,outScene){
        this._activeScene.destroy();
        
        this.loadScene(inScene,true);
    }

    loadScene(name, bootstrap = true){
        this._activeScene = BlueprintBuilder.getInstance().createAndAddObject(this._target,this._sceneMap[name],bootstrap);
        //this._target.addNode(this._target.createNode(blueprint,bootstrap))
        //this._activeScene = this._target.createTree(blueprint,bootstrap);
        //this._target.addComponent(this._activeScene);
    }

    unloadScene(scene){
        scene.destroy();
    }
    
} 