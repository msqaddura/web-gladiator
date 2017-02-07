import * as AutoLayout from 'autolayout';

export class AutoLayoutAdapter {
    private static instance: AutoLayoutAdapter;
    private constructor() {
        // do something construct...
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AutoLayoutAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    parseVFL(vfl=['']){
        const constraints = AutoLayout.VisualFormat.parse(vfl, {extended: true});
        const view = new AutoLayout.View({constraints: constraints});
        return view;
    }
    parse(vfl=[''], width= 800,height=600){
        const constraints = AutoLayout.VisualFormat.parse(vfl, {extended: true});
        let view = new AutoLayout.View({constraints: constraints});
        view.setSize(width, height);
        return view;
    }
} 