import * as PIXI from 'pixi.js'

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { VirtualView } from '../Base/VirtualView';
import { MainSceneStructure } from '../../Game/MainSceneStructure';
import { ManifestLoader } from './Loader/ManifestLoader';



export class Application extends VirtualView{
 _application;
 _loading;
 _currentScene;
 canvas;
 renderer;
 constructor(owner=null,params,bootstrap=false){
     super(owner, params);
     this._application = new PIXI.Application(window.innerWidth,window.innerHeight);
     this.renderer = this._application.renderer;
     this.canvas = this._application.view;
     this.$view = this._application.stage; 
     this.$height = window.innerHeight;
     this.$width = window.innerWidth;


     document.body.appendChild(this.canvas);
     window.addEventListener("resize", this.resize.bind(this));
     window["app"] = this;
 }


 preloadScene(scene){
    this._loading=scene;
    PIXI.loader
    .add([
        "Resources/MainSceneManifest.json"
    ])
  .load(this.preloadSceneAssets.bind(this));
 }

 preloadSceneManifest(scene){
    this._loading=scene;
    PIXI.loader
    .add([
        "Resources/MainSceneManifest.json"
    ])
  .load(this.preloadSceneAssets.bind(this));
 }


 preloadSceneAssets(loader,resources){
    loader.add(resources["Resources/MainSceneManifest.json"]["data"]).load(this.createScene.bind(this));
 }
 createScene(...args){
     console.info("yup",args);
    this._currentScene = this.createComponent(this._loading,true);
    this.addComponent(this._currentScene);
    this.parseLayout();
 }

 resize(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.resize(width,height);
    this.$width=width;
    this.$height=height;
    this.renderLayout();
 }

} 
