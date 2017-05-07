import * as PIXI from 'pixi.js'

import { SpaceContainer } from "./SpaceContainer";
import { ResourceFacade } from '../Engine/Resource/ResourceFacade';
import { SceneManager } from '../Foundation/Manager/SceneManager';
import { DeviceFacade } from "../Engine/Device/DeviceFacade";
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';
import { NetFacade } from '../Engine/Net/NetFacade';

export class Application extends SpaceContainer {

    _application;
    _loading;
    _currentScene;
    sceneMap;
    canvas;
    renderer;
    canResize = true;
    constructor(owner = null, params) {
        super(owner, params);
        this.sceneMap = params.sceneMap;
        this._application = new PIXI.Application(window.innerWidth, window.innerHeight,
            {
                antialiasing: false,
                transparent: false,
                autoResize: true
            }
        );
        this.renderer = this._application.renderer;
        this.canvas = this._application.view;
        this.$view = this._application.stage;

        //this.$height = window.innerHeight;
        //this.$width = window.innerWidth;
        document.body.appendChild(this.canvas);
        DeviceFacade.getInstance().getResizeObs().subscribe(this.resize.bind(this))
        SceneManager.getInstance().setTarget(this);
    }


    preloadScene(blueprint) {
        this._loading = blueprint;
         return ResourceFacade.getInstance().preloadManifest(blueprint.manifest);
    }


    createScene(blueprint) {
        this._currentScene = this.createNode(blueprint, true);
        this.addNode(this._currentScene);
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.parseLayout(width, height, 0, 0);
    }
    refresh(){
        let dimensions = {
            width:window.innerWidth,
            height:window.innerHeight
        }
        this.resize(dimensions);
    }
    resize(dimensions) {
        if (!this.canResize) return;
        this.renderer.resize(dimensions.width, dimensions.height);
        this.parseLayout(dimensions.width, dimensions.height, 0, 0);
    }

}

GameObjectBuilder.getInstance().registerGameObject('Application', Application);
