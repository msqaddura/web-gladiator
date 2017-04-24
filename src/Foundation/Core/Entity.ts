import * as Rx from 'rxjs';


import { IEntity } from './IEntity';
import { Component } from './Component';
import { LayoutFacade } from '../../Engine/Layout/LayoutFacade';
import { Interactive } from './Interactive';
import { Scene } from '../GameObjects/Scene';
import { GameObjectBuilder } from "../Builder/GameObjectBuilder";
import { EventFacade } from '../../Engine/Communication/EventFacade';
export class Entity extends Component implements IEntity, Interactive {
    $$$scaleOnly = false;
    _registeredMessages;
    _scene:Scene;
    $view;
    _interactive;
    _x = 0;
    _left = 0;
    _y = 0;
    _top =0;
    _width = 0;
    _height = 0;
    _anchorX;
    _anchorY;
    _scaleX = 1;
    _scaleY = 1;
    _vfl=[""];
    _autolayout;
    _registeredHIDEvents = {};
    _visible:boolean;
    params;
    readonly config: Object;
    constructor(owner, params, bootstrap = false) {
        super(owner, { name: params.name, componentList: params.componentList, repeatableList: params.repeatableList });
        this.config = params.config || {};
        this._vfl = params.vfl || this._vfl;
        this.params = params;
        this._scene = owner && owner._scene? owner._scene: null;
        
        this.bootstrap(bootstrap);

    }
    bootstrap(bootstrap) {
        if(!bootstrap)
            return;
        this.selfConstruct();
        this.preInitialize();
        this.initialize();
        this.postInitialize();
        this.preCreateComponents();
        this.createComponents();
        this.postCreateComponents();
        this.listenToHIDEvents(false);
        this.listenToBusEvents();
    }

    listenToHIDEvents(isInteractive = true) {
        this.$interactive = isInteractive;
    }

    selfConstruct() {
        this.$view.name = this.name;
        if(this.params.hasOwnProperty("visible"))
            this.$visible = this.params.visible;
    }

    postCreateComponents() {
        super.postCreateComponents();
    }


    parseLayout(width,height,left,top) {
        
        this.$width = width;
        this.$height = height;
        this.$left = left;
        this.$top = top;
        this._autolayout = LayoutFacade.getInstance()
        .parseEVFL(this._vfl)
        this.parseComponentsLayout();
        
        
    }
    parseComponentsLayout() {
        //TODO: save LayoutViews and dont update if it is the same
        const layoutViews = this._autolayout.setSize(this.$width, this.$height)
        for (const key in layoutViews.subViews) {
            const component = this.components[key];
            if (component) {
                const {width,height,left,top} = layoutViews.subViews[key];
               
                component.parseLayout(width,height,left,top);
            }
        }
    }

    createComponent(comp,bootstrap=true): Component {
        return GameObjectBuilder.getInstance().createGameObject(comp["ctor"],this,comp,bootstrap)
        //return new comp["ctor"](this, comp,bootstrap);
    }

    addComponent(component) {
        super.addComponent(component);
        if (component instanceof Entity)
            this.addView(component);

    }
    addView(view: Entity) {
        this.$view.addChild(view.$view);
    }

    registerHIDEvent(name: string) {
        this._registeredHIDEvents[name] = Rx.Observable.fromEvent(this.$view, name);
        return this._registeredHIDEvents[name];
    }
    listenToBusEvents(){}

    registerMessage(ctor){
       return EventFacade.getInstance().registerMessage(ctor);
    }
    sendMessage(obj){
        EventFacade.getInstance().sendMessage(obj);
    }

    info() {
        const info = {
            x: this.$x,
            y: this.$y,
            w: this.$width,
            h: this.$height,

        }
        const info2 = {
            Px: this.$view.x,
            Py: this.$view.y,
            Ph: this.$view.height,
            Pw: this.$view.width
        }
        console.info(this.name, info, info2);
        return info;
    }
    get $x() {
        return this._x;
    }
    set $x(value) {
        this.$view.position.x = value + this.$left;
        this._x = value;
    }

    get $left() {
        return this._left;
    }
    set $left(value) {
        this.$view.position.x = value + this.$x;
        this._left = value;
    }

    get $y() {
        return this._y;
    }
    set $y(value) {
        this.$view.position.y = value + this.$top;
        this._y = value;
        
    }

    get $top() {
        return this._top;
    }
    set $top(value) {
        this.$view.position.y = value + this.$y;
        this._top = value;
    }

    get $width() {
        return this._width;
    }
    set $width(value) {
        this.$view.width = value;
        this._width = value;
    }

    get $height() {
        return this._height;
    }
    set $height(value) {
        this.$view.height = value;
        this._height = value;
    }

    get $anchorX() {
        return this._anchorX;
    }
    set $anchorX(value) {
        this._anchorX = value;
        this.$view.anchor.x = value;
    }

    get $anchorY() {
        return this._anchorY;
    }
    set $anchorY(value) {
        this._anchorY = value;
        this.$view.anchor.y = value;
    }

    get $scaleX() {
        return this._scaleX;
    }
    set $scaleX(value) {
        this._scaleX = value;
        this.$view.width = this.$width * this._scaleX;
    }

    get $scaleY() {
        return this._scaleY;
    }
    set $scaleY(value) {
        this._scaleY = value;
        this.$view.height = this.$height * this._scaleY;
    }

    get $visible(){
        return this._visible;
    }
    set $visible(value:boolean){
        this._visible = value;
        this.$view.visible =value;
    }
    set $interactive(value:boolean){
        this._interactive=value;
        this.$view.interactive=value;
        this.$view.buttonMode=value;
    }
    get $interactive(){
        return this._interactive;
    }
}

