import * as AutoLayout from 'autolayout';
export class LayoutSystem {
    private static instance: LayoutSystem;
    _adapter;
    private constructor() {
        // do something construct...
        //this.layoutAdapter = new AutoLayoutAdapter();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LayoutSystem();

            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    use(adapter){
        this._adapter = adapter;
    }
    parseEVFL(vfl=['']){
        return this._adapter.parseEVFL(vfl)
    }
} 