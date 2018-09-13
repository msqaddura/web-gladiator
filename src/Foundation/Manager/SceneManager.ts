import { System } from '../../System/System';
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
    _resources;
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
        this._resources = target.resource;
    }
    registerScene(name,scene){
        this._sceneMap[name]=scene;
    }
    getScene(name){
        return this._sceneMap[name];
    }
    preloadScene(name:string) {  
         return System.getInstance().getSystem("resource").preloadManifest(this._sceneMap[name].manifest);
    }
    preload(name:string) {  
         return System.getInstance().getSystem("resource").preload(this._resources);
    }
    switchScenesTo(inScene,outScene){
        this._activeScene.kill();
        
        this.loadScene(inScene,true);
        //this._target.refresh();
    }

    loadScene(name, bootstrap = true){
        System.getInstance().getSystem("layout").parseLayout(this._sceneMap[name].sceneLayout,name);
        this._activeScene = BlueprintBuilder.getInstance().createAndAddObject(this._target,this._sceneMap[name],bootstrap);
        this._target.currentScene=this._activeScene;
        this._target.currentScene.updateLayout();
        //QQQQQHack
        this._target.currentScene.updateLayout();
        //this._target.refresh();
        
        //this._target.addNode(this._target.createNode(blueprint,bootstrap))
        //this._activeScene = this._target.createTree(blueprint,bootstrap);
        //this._target.addComponent(this._activeScene);
    }

    unloadScene(scene){
        scene.kill();
    }
  
    
} 

export let sceneManager = SceneManager.getInstance();