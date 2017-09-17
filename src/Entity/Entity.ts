import * as PIXI from 'pixi.js'

import { View } from '../Foundation/Core/View';
import { GameObjectBuilder } from '../Foundation/Builder/GameObjectBuilder';
import { MathUtil } from '../Util/MathUtil';
export class Entity extends View {
$$$scaleOnly = false;
$$$visited = false;
 constructor(owner, params){
     super(owner,params);
     this.view = new PIXI.Container();
 }

    initialize(){
        super.initialize();
        this.$$$scaleOnly = !!this.params["scaleOnly"];
        
    }
     get width() {
        return this._width;
    }

    set width(value) {
        value = MathUtil.toFixed(value);
        if(this.$$$scaleModeActive)
            this.view.width = value;
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        value = MathUtil.toFixed(value);
        if(this.$$$scaleModeActive)
            this.view.height = value;
        this._height = value;
    }
    // parseTreeLayout() {
    //     if(!this.$$$scaleModeActive)
    //         super.parseTreeLayout();
    //     this.$$$visited = true;
    // }

    updateLayoutTree() {
        if(!this.$$$scaleModeActive)
            super.updateLayoutTree();
        this.$$$visited = true;
    }

    get $$$scaleModeActive(){
        return this.$$$visited && this.$$$scaleOnly;
    }
} 

GameObjectBuilder.getInstance().registerGameObject('Entity',Entity);