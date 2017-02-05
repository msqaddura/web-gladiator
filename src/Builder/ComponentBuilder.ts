import { Component } from '../Component/Base/Component';
import { View } from '../Component/Base/View';
export class ComponentBuilder {
    root;
    constructor(comp){
        console.info(comp);
        window['cb']=this;
        window.addEventListener("resize", this.resize.bind(this));
        this.root = new comp["family"]({owner:this,name:comp.name,componentList:comp.componentList,vfl:comp.vfl});
        this._createComponents(this.root);
        this.resize();
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
        if(owner instanceof View)
            owner.parseLayout();
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

    resize(){
    const width = window.innerWidth;
    const height = window.innerHeight;
     
    
    //window['cb'].root.$width = width;
    //window['cb'].root.$height = height;
    this.root.renderer.resize(width,height);
    this.root.$width=width;
    this.root.$height=height;
    this.updateLayout(this.root);
    }
    updateLayout(owner=this.root){
        if(owner instanceof View){
            owner.renderLayout();
        }
        for(const key in owner.components){
            this.updateLayout(owner.components[key])
        }
    }

    info(owner=this.root){
        if(owner instanceof View){
            owner.info();
        }
        for(const key in owner.components){
            this.info(owner.components[key])
        }
    }

}