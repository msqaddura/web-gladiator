import * as PIXI from 'pixi.js'

import { Entity } from "./Entity";
import { SceneManager } from '../Foundation/Manager/SceneManager';
import { System } from "../System/System";
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';
import { BlueprintBuilder} from '../Foundation/Builder/BlueprintBuilder';

export class Application extends Entity {

    _application;
    _loading;
    currentScene;
    sceneMap;
    canvas;
    renderer;
    canResize = true;
    gameLayout;
    constructor(owner = null, params) {
        super(owner, params);
        this.sceneMap = params.sceneMap;
        const options = {
            antialiasing: false,
            transparent: true,
            autoResize: true,
            resolution: window.devicePixelRatio || 1 
        }
        this._application = new PIXI.Application(window.innerWidth, window.innerHeight, options);
        this.renderer = this._application.renderer;
        this.canvas = this._application.view;
        this.view = this._application.stage;
        this.gameLayout = params.gameLayout;
        //this.$height = window.innerHeight;
        //this.$width = window.innerWidth;
        document.body.appendChild(this.canvas);
        System.getInstance().setTarget(this);
        System.getInstance().getSystem("layout").parseLayout(this.gameLayout,'game');
        SceneManager.getInstance().setTarget(this);
    }

    create(items){
        this.params.directChildren.forEach(key => {
            BlueprintBuilder.getInstance().createAndAddObject(this,this.params.blueprints.find(item=>item.name==key))
        });
        this.updateLayoutTree();    
    }
    // refresh(){
    //     let dimensions = {
    //         width:window.innerWidth,
    //         height:window.innerHeight
    //     }
    //     this.resize(dimensions);
    // }
    loadScene(name){
        SceneManager.getInstance().loadScene(name);
        
    }

    switchScenesTo(name, kill=true){
        this.removeNode(this.currentScene.name);
        SceneManager.getInstance().switchScenesTo(name,kill);
    }
    resize(width, height) {
        if (!this.canResize) return;
        this.renderer.resize(width, height);
        this.width = width;
        this.height = height;
        this.updateLayoutTree();
    }

}

GameObjectBuilder.getInstance().registerGameObject('Application', Application);
