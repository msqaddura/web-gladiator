import { Component } from '../Component/Base/Component';
import { View } from '../Component/Base/View';
export class ComponentBuilder {
    root;
    constructor(comp){
        console.info(comp);
        window['cb']=this;
        window.addEventListener("resize", this.resize.bind(this));
        this.root = new comp["ctor"](this,comp);
        this.root.bootstrap(true);
        //this._createComponents(this.root);
        this.resize();
    }
  
    _createComponents(owner:Component) {
        owner.bootstrap(true);
        this._createNestedComponents(owner);
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
        // for(const key in owner.components){
        //     this.updateLayout(owner.components[key])
        // }
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