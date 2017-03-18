import { IComponent } from './IComponent';
import { MissingComponent } from './MissingComponent';
export class Component implements IComponent{
    readonly  owner: Component;
    readonly name:string;
    readonly componentList:Array<Component>;
    readonly repeatableList;
    readonly family;
    public components:Object={};

    constructor(owner=null,{name="N/A", componentList=[],repeatableList=[]},bootstrap=false) {
        this.owner = owner;
        this.name = name;
        this.componentList=componentList;
        this.repeatableList=repeatableList;

        //this.selfConstruct();

        //this.preInitialize();
        //this.initialize();
        //this.postInitialize();

        //this.preCreateComponents();
        //this.createComponents(componentList);
        //this.postCreateComponents();
        if(bootstrap)
            this.bootstrap();
    }
    bootstrap(){
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
       return new comp["family"](this,comp,bootstrap);
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

    dispose(){}
    destroy(){}

}