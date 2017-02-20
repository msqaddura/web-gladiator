import * as Rx from 'rxjs';

import { DisplayObject } from '../Primitive/DisplayObject';
import { IView } from './IView';
import { Component } from './Component';
import { AutoLayoutAdapter } from '../../Adapter/AutolayoutAdapter';
import { Interactive } from './Interactive';
export class View extends Component implements IView,Interactive {
    $view;
    _x;
    _y;
    _width;
    _height;
    _anchorX;
    _anchorY;
    _scaleX;
    _scaleY;
    _vfl;
    _autolayout;
    _registeredHIDEvents ={};
    params;
    readonly config: Object;
    constructor(owner, params) {
        super( owner, {name:params.name, componentList:params.componentList,repeatableList:params.repeatableList} );
        this.config = params.config || {};
        this._vfl = params.vfl || [""];
        this.params = params;
        
    }
    bootstrap(){
        super.bootstrap();
        this.parseLayout();
        this.listenToHIDEvents(false);
    }
    
    listenToHIDEvents(isInteractive=true){
        this.$view.interactive = isInteractive;
    }

    selfConstruct(){
        this.$view.name = this.name;
    }

    postCreateComponents() {
        super.postCreateComponents();
    }


    parseLayout(){
        this._autolayout = AutoLayoutAdapter.getInstance().parseVFL(this._vfl);
        this.renderLayout();
    }
    renderLayout() {
        //TODO: save LayoutViews and dont update if it is the same
        const layoutViews = this._autolayout.setSize(this.$width,this.$height)
        for (const key in layoutViews.subViews) {
            const component = this.components[key];
            if (component) {
                const subView = layoutViews.subViews[key];
                component.$x = subView.left;
                component.$y = subView.top;
                component.$width = subView.width;
                component.$height = subView.height;
            }
        }
        //this.renderComponentsLayout();
    }
    renderComponentsLayout(){
        for (const key in this.components)
            this.components[key].updateLayout;
    }

    createComponent(comp): Component {
        return new comp["family"](this,comp);
    }

    addComponent(component) {
        super.addComponent(component);
        if (component instanceof View)
            this.addView(component);

    }
    addView(view: View) {
        this.$view.addChild(view.$view);
    }

    registerHIDEvent(name:string){
        this._registeredHIDEvents[name] = Rx.Observable.fromEvent(this.$view,name);
        return this._registeredHIDEvents[name];
    }

        info(){
        const info = {
            x:this.$x,
            y:this.$y,
            w:this.$width,
            h:this.$height,

        }
        const info2 = {
            Px:this.$view.x,
            Py:this.$view.y,
            Ph:this.$view.height,
            Pw:this.$view.width
        }
        console.info(this.name,info,info2);
        return info;
    }
    get $x() {
        return this._x;
    }
    set $x(value) {
        this.$view.position.x = value;
        this._x = value;
    }

    get $y() {
        return this._y;
    }
    set $y(value) {
        this.$view.position.y = value;
        this._y = value;
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

    get $anchorX(){
        return this._anchorX;
    }
    set $anchorX(value){
        this._anchorX = value;
        this.$view.anchor.x = value;
    }

    get $anchorY(){
        return this._anchorY;
    }
    set $anchorY(value){
        this._anchorY = value;
        this.$view.anchor.y = value;
    }


    get $scaleX(){
        return this._scaleX;
    }
    set $scaleX(value){
        this._scaleX = value;
        this.$view.scale.x *= value;
    }

    get $scaleY(){
        return this._scaleY;
    }
    set $scaleY(value){
        this._scaleY = value;
        this.$view.scale.y *= value;
    }
}

