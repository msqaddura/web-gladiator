import { ResourceFacade } from '../../Engine/Resource/ResourceFacade';
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
    }
    registerScene(name,scene){
        this._sceneMap[name]=scene;
    }
    getScene(name){
        return this._sceneMap[name];
    }
    preloadScene(blueprint) {  
         return ResourceFacade.getInstance().preloadManifest(blueprint.manifest);
    }
    
    switchScenesTo(inScene,outScene){
        this._activeScene.destroy();
        
        this.loadScene(inScene,true);
    }

    loadScene(blueprint, bootstrap = true){
        this._activeScene = this._target.createComponent(blueprint,bootstrap);
        this._target.addComponent(this._activeScene);
    }

    unloadScene(scene){
        scene.destroy();
    }
    
} 