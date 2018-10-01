import { BlueprintBuilder } from "../../Foundation/Builder/BlueprintBuilder";
import { System } from "../../System/System";
/**
 * What have I done?
 * REFACTOR EVERY SINGLE LINE OF CODE... although function names are right
 */
export class SceneManager {
    static getInstance() {
        if (!this.instance) {
            this.instance = new SceneManager();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    private static instance: SceneManager;

    sceneMap = {};
    target;
    activeScene;
    resources;

    setTarget(target) {
        this.target = target;
        this.sceneMap = target.sceneMap;
        this.resources = target.resource;
    }
    registerScene(name, scene) {
        this.sceneMap[name] = scene;
    }
    getScene(name) {
        return this.sceneMap[name];
    }
    preloadScene(name: string) {
        return System.getInstance().getSystem("resource").preloadManifest(this.sceneMap[name].manifest);
    }
    preload(name: string) {
        return System.getInstance().getSystem("resource").preload(this.resources);
    }
    switchScenesTo(inScene, outScene) {
        this.activeScene.kill();

        this.loadScene(inScene, true);
        // this._target.refresh();
    }

    loadScene(name, bootstrap = true) {
        System.getInstance().getSystem("layout").parseLayout(this.sceneMap[name].sceneLayout, name);
        this.activeScene = BlueprintBuilder.getInstance()
            .createAndAddObject(this.target, this.sceneMap[name], bootstrap);
        this.target.currentScene = this.activeScene;
        this.target.currentScene.updateLayout();
        // QQQQQHack
        this.target.currentScene.updateLayout();
        // this._target.refresh();

        // this._target.addNode(this._target.createNode(blueprint,bootstrap))
        // this._activeScene = this._target.createTree(blueprint,bootstrap);
        // this._target.addComponent(this._activeScene);
    }

    unloadScene(scene) {
        scene.kill();
    }

}

export let sceneManager: SceneManager = SceneManager.getInstance();
