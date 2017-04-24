import * as PIXI from 'pixi.js'

import { SpaceContainer } from "./SpaceContainer";
import { ResourceFacade } from '../../Engine/Resource/ResourceFacade';
import { DeviceFacade } from "../../Engine/Device/DeviceFacade";
import { GameObjectBuilder } from '../Builder/GameObjectBuilder';
import { NetFacade } from '../../Engine/Net/NetFacade';

export class Application extends SpaceContainer {
    _application;
    _loading;
    _currentScene;
    _blueprints;
    canvas;
    renderer;
    canResize = true;
    constructor(owner = null, params, bootstrap = false) {
        super(owner, params);
        this._blueprints = params.blueprints;
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
        this.bootstrap(bootstrap);
    }

    preloadScene(blueprint) {
        this._loading = blueprint;
         return ResourceFacade.getInstance().preloadManifest(blueprint.manifest);
    }


    createScene(blueprint) {
        this._currentScene = this.createComponent(blueprint, true);
        this.addComponent(this._currentScene);
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.parseLayout(width, height, 0, 0);
    }

    resize(dimensions) {
        if (!this.canResize) return;
        this.renderer.resize(dimensions.width, dimensions.height);
        this.parseLayout(dimensions.width, dimensions.height, 0, 0);
    }

}

GameObjectBuilder.getInstance().registerGameObject('Application', Application);
