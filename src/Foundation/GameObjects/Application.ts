import * as PIXI from 'pixi.js'

import { SpaceContainer } from "./SpaceContainer";
import { ResourceFacade } from '../../Engine/Resource/ResourceFacade';
import { DeviceFacade } from "../../Engine/Device/DeviceFacade";


export class Application extends SpaceContainer{
 _application;
 _loading;
 _currentScene;
 canvas;
 renderer;
 canResize = true;
 constructor(owner=null,params,bootstrap=false){
     super(owner, params);
     this._application = new PIXI.Application(window.innerWidth,window.innerHeight,
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
     window["app"] = this;
 }


 preloadScene(scene){
    this._loading=scene;
    ResourceFacade.getInstance().preloadManifest([
        "Resources/MainSceneManifest.json"
    ],this.createScene.bind(this))
 }

//  preloadSceneManifest(scene){
//     this._loading=scene;
//     PIXI.loader
//     .add([
//         "Resources/MainSceneManifest.json"
//     ])
//   .load(this.preloadSceneAssets.bind(this));
//  }


//  preloadSceneAssets(loader,resources){
//     loader.add(resources["Resources/MainSceneManifest.json"]["data"]).load(this.createScene.bind(this));
//  }
 createScene(...args){
     console.info("yup",args);
    this._currentScene = this.createComponent(this._loading,true);
    this.addComponent(this._currentScene);
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.parseLayout(width,height,0,0);
 }

 resize(dimensions){
    if(!this.canResize)return;
    this.renderer.resize(dimensions.width,dimensions.height);
    this.parseLayout(dimensions.width,dimensions.height,0,0);
 }

} 
