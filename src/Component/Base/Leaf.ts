import { IComponent } from './IComponent';
import { Component } from './Component';
import { MissingComponent } from './MissingComponent';
export class Leaf extends Component{
    readonly  owner: Component;
    readonly name:string;
    readonly componentList:Object;
    readonly family;
    public components:Object={};

    constructor(owner, params){
        super(owner, params);
        this.owner = owner;
        this.name = name;
    }
    bootstrap(){
        return;
    }
    selfConstruct(){}
    preInitialize(){}
    initialize(){}
    postInitialize(){}

    preCreateComponents():void{}

    createComponents():Object{
        return {};
    }
    
    createComponent(comp:IComponent):Component{
       return null;
    }

    addComponent(component:Component):void{
    }

    postCreateComponents():void{

    };
    disposeComponent(component:Component){
    }

    preCreateNestedComponents(){}
    createNestedComponents(level:Number=100){
    }
    postCreateNestedComponents(){

    }

    destroyComponent(component:Component){
        component.destroy();
    }

    iterate(fn:Function, list=this.componentList){
        for(var key in list){
            fn(list[key]);
        }
    }

    dispose(){}
    destroy(){}

}