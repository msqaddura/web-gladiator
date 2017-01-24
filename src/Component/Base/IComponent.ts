import {Component} from './Component';
export interface IComponent {
    _owner: Component;
    _name:string;
    _components:Object;
    _family:Component;

    initialize(params):void;//pass params from constructor
    preCreate():void;
    createComponents(components:Object):Object;    
    postCreate():void;
    createComponent(identity:IComponent):void;
    addComponent(component:Component,name):void;
    disposeComponent(component:Component);
    destroyComponent(component:Component);
    
    dispose();
    destroy();
}