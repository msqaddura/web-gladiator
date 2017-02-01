import {Component} from './Component';
import { MissingComponent } from './MissingComponent';
export interface IComponent {
    readonly owner: Component;
    readonly name:string;
    readonly componentList:Object;
    components:Object;
  
    selfConstruct();
    
    preInitialize();
    initialize();
    postInitialize();
    
    preCreateComponents():void;
    createComponents(comps:Object):Object;
    createComponent(comp:IComponent):void;
    addComponent(component:Component,name):void;
    postCreateComponents():void;
    
    
    disposeComponent(component:Component);
    destroyComponent(component:Component);
    
    dispose();
    destroy();


    //specialFunctions
    iterate(fn:Function, list);
}