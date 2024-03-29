
import { GameObjectBuilder } from "../Foundation/Builder/GameObjectBuilder";
import { Entity } from "./Entity";

export class Scene extends Entity {
    _manifest;
    _blueprint;
    sceneLayout;
    constructor(owner, params) {
        super(owner, params);
        this._manifest = params.manifest;
        this._blueprint = params.blueprint;
        this.sceneLayout = params.sceneLayout;
        // ManifestLoader.getInstance().preload(this._manifest,this.preloadAssits.bind(this));

    }

    load() {
        //
    }
    show() {
        //
    }
    hide() {
        //
    }

}

GameObjectBuilder.getInstance().registerGameObject("Scene", Scene);
