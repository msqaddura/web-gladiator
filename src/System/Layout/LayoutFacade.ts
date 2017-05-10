import * as AutoLayout from 'autolayout';
export class LayoutFacade {
    private static instance: LayoutFacade;
    _adapter;
    private constructor() {
        // do something construct...
        //this.layoutAdapter = new AutoLayoutAdapter();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LayoutFacade();

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