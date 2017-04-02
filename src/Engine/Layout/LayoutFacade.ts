import * as AutoLayout from 'autolayout';
import AutoLayoutAdapter from "./AutolayoutAdapter";
export class LayoutFacade {
    private static instance: LayoutFacade;
    layoutAdapter;
    private constructor() {
        // do something construct...
        this.layoutAdapter = new AutoLayoutAdapter();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LayoutFacade();

            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    parseEVFL(vfl=['']){
        return this.layoutAdapter.parseEVFL(vfl)
    }
} 