import { DisplayObject } from '../Primitive/DisplayObject';
import { IView } from './IView';
import { Component } from './Component';
import { AutoLayoutAdapter } from '../../Adapter/AutolayoutAdapter';
export class View extends Component implements IView {
    $view;
    _vfl;
    _autolayout;
    readonly config:Object;
    constructor({owner,name,componentList,config,vfl=[""]}) {
        super({owner,name,componentList});
        this.config=config;
        this._vfl = vfl;
    }

    postInitialize(){
        this.renderLayout();
    }

    renderLayout(){
        this._autolayout = AutoLayoutAdapter.getInstance().parse(this._vfl);
    }


    createComponent(comp):Component{
       const component = new comp["family"]({
           owner:this, 
           name:comp.name,
           componentList:comp.componentList,
           config:comp.config,
           vfl:comp.vfl
        });
       return component;
    }

    addComponent(component) {
        super.addComponent(component);
        if (component instanceof View)
            this.addView(component);

    }
    addView(view:View){
        this.$view.addChild(view.$view);
    }
}

