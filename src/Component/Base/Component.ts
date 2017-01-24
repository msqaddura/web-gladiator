import { IComponent } from './IComponent';

export class Component implements IComponent{
    public  _owner: Component;
    readonly _name:string;
    readonly _family:Component;
    public _components:Object={};

    constructor(owner=null ,{name="",family,params={},components={}}) {
        this._owner = owner;
        this._name = name;
        this._family = family
        this.initialize(params);

        this.preCreate();
        this.createComponents(components);
        this.postCreate();
    }

    initialize(params:Object):void{
    }

    preCreate():void{}
    createComponents(components:Object):Object{
        for(var key in components){
            this.createComponent(components[key]);
        }
        return this._components;
    }
    
    createComponent(component:IComponent):void{
       const comp = new component['family'](this,component);
       this.addComponent(comp);
    }

    addComponent(component:Component):void{
         this._components[component._name]=component;
    }

    postCreate():void{};
    disposeComponent(component:Component){
        component.dispose();
    }

    destroyComponent(component:Component){
        component.destroy();
    }


    dispose(){}
    destroy(){}
}