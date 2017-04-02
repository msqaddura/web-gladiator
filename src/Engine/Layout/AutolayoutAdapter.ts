import * as AutoLayout from 'autolayout';

export default class AutoLayoutAdapter {
    constructor() {}

    parseEVFL(evfl=['']){
        const constraints = AutoLayout.VisualFormat.parse(evfl, {extended: true});
        const view = new AutoLayout.View({constraints: constraints});
        return view;
    }
} 