import { Component } from '../Component/Base/Component'
export class ComponentBuilder {
    root;
    constructor(comp){
        console.info(comp);
        this.root = new comp["family"]({owner:this,name:comp.name,componentList:comp.componentList});
        this._createComponents(this.root);
    }

    _createComponents(owner:Component) {
        owner.selfConstruct();
        owner.preInitialize();
        owner.initialize();
        owner.postInitialize();
        owner.preCreateComponents();
        owner.createComponents();
        // for (const key in componentList){
        //     const component:Component =  owner.createComponent(componentList[key]);
        //     owner.addComponent(component);
        //     //this._createComponent(componentList[key],owner);
        // }
        owner.postCreateComponents();
        // owner.preCreateNestedComponents();
        // owner.createNestedComponents();
        // owner.postCreateNestedComponents();
        this._createNestedComponents(owner);
        // for (const key in owner.components){
        //     this._createComponents(owner.components[key].componentList,owner.components[key]);
        // }
    }

    _createNestedComponents(owner){
        owner.preCreateNestedComponents();
        for (const key in owner.components){
             this._createComponents(owner.components[key]);
        }
        owner.postCreateNestedComponents();
    }
    _createComponent(comp, owner:Component) {
      const component:Component =  owner.createComponent(comp);
      owner.addComponent(component);
        //if(component.componentList)
        //    this._createComponents(component.componentList,component);       
    }
}