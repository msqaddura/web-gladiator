import * as AutoLayout from 'autolayout';

export class AutolayoutAdapter {
    constructor() {}

    parseEVFL(evfl=['']){
        const constraints = AutoLayout.VisualFormat.parse(evfl, {extended: true});
        const view = new AutoLayout.View({constraints: constraints});
        return view;
    }
} 