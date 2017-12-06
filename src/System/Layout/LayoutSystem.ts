import * as AutoLayout from 'autolayout';
import * as Rx from 'rxjs';
import { System } from '../System';

export class LayoutSystem {
    private static instance: LayoutSystem;
    _adapter;
    _layout;
    _width;
    _height;
    layouts={

    }
    private constructor() {
        // do something construct...
        //this.layoutAdapter = new AutoLayoutAdapter();
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        Rx.Observable.fromEvent(window, "resize")
            .debounceTime(100)
            .subscribe(() => {
                this._width = window.innerWidth;
                this._height = window.innerHeight;
                this.updateLayoutSize();
                this.iterateTree();

            });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LayoutSystem();

            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    parseLayout(vfl,name) {
        //this._layout = this._adapter.parseEVFL(vfl);
        this.layouts[name] = this._adapter.parseEVFL(vfl);
        this.updateLayoutSize();
    }
    updateLayoutSize() {
        for (const key in this.layouts)
        this.layouts[key].setSize(this._width,this._height);
        //this._layout.setSize(this._width, this._height);
    }
    getSubView(name) {
        let result = null;
        for (const key in this.layouts) {
            if (this.layouts[key].subViews[name]) {
                return this.layouts[key].subViews[name]
            }
        }
        return result;
    }
    //use here visitor or iterator pattern
    //for now we are happy by Views taking care of themselves
    //remember visitor needs overloading and that is not allowed in typescript YET
    iterateTree() {
        System.getInstance().target.resize(this._width,this._height)

    }
    
    use(adapter) {
        this._adapter = adapter;
    }
    parseEVFL(vfl = ['']) {
        return this._adapter.parseEVFL(vfl)
    }
} 