import { Component } from '../Component/Base/Component'
export class ComponentBuilder {
    root;
    constructor(comp){
        console.info(comp);
        this.root = new comp["family"]({owner:this,name:comp.name,componentList:comp.componentList});
        this._createComponents(this.root.componentList,this.root);
    }

    _createComponents(componentList={}, owner:Component) {
        owner.selfConstruct();
        owner.preInitialize();
        owner.initialize();
        owner.postInitialize();
        owner.preCreateComponents();
        for (const key in componentList){
            this._createComponent(componentList[key],owner);
        }
        owner.postCreateComponents();
    }

    _createComponent(comp, owner:Component) {
      const component:Component =  owner.createComponent(comp);
      owner.addComponent(component);
        if(component.componentList)
            this._createComponents(component.componentList,component);       
    }
}