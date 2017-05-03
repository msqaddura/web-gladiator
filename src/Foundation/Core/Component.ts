import { IComponent } from './IComponent';
import { MissingComponent } from './MissingComponent';
export class Component implements IComponent{
    readonly  owner: Component;
    readonly name:string;
    readonly componentList:Array<Component>;
    readonly repeatableList;
    readonly lazyList;
    readonly ctor;
    public components:Object={};

    constructor(owner=null,{name="N/A", componentList=[],repeatableList=[],lazyList={}},bootstrap=false) {
        this.owner = owner;
        this.name = name;
        this.componentList=componentList;
        this.repeatableList=repeatableList;
        this.lazyList=lazyList;
        //this.selfConstruct();

        //this.preInitialize();
        //this.initialize();
        //this.postInitialize();

        //this.preCreateComponents();
        //this.createComponents(componentList);
        //this.postCreateComponents();
        this.bootstrap(bootstrap);
    }
    bootstrap(bootstrap){
        if(!bootstrap)
            return;
        this.selfConstruct();
        this.preInitialize();
        this.initialize();
        this.postInitialize();
        this.preCreateComponents();
        this.createComponents();
        this.postCreateComponents();
    }
    selfConstruct(){}
    preInitialize(){}
    initialize(){}
    postInitialize(){}

    preCreateComponents():void{}
    createLazyChild(child,bootstrap=true){
        this.addComponent(this.createComponent(child,bootstrap));
    }
    createComponents(bootstrap=true):Object{
        this.repeatableList.forEach(tuple=>{
            tuple.repeats.forEach(repeat=>{
                this.addComponent(this.createComponent(Object.assign(tuple.repeatable,repeat),bootstrap));
            })
        })


        this.componentList.forEach(comp=>{
            this.addComponent(this.createComponent(comp,bootstrap))
        })
        return this.components;
    }
    
    createComponent(comp:Component,bootstrap=true):Component{
       return new comp["ctor"](this,comp,bootstrap);
    }

    addComponent(component:Component):void{
         this.components[component.name]=component;
    }

    postCreateComponents():void{};
    disposeComponent(component:Component){
        component.dispose();
    }

    preCreateNestedComponents(){}
    createNestedComponents(level:Number=100){
        for(var key in this.components){
            this.components[key].createComponents();
        } 
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
    removeComponent(name){
        delete this.componentList[name];
    }
    dispose(){}
    destroy(){
        for (const key in this.components){
            this.components[key].destroy();
            this.removeComponent(key);
        }
    }

}