import { DisplayObject } from '../Primitive/DisplayObject';
import { IView } from './IView';
import { Component } from './Component';

export class View extends Component implements IView {
    _view;

    constructor(owner, ...paramsArr) {
        super(owner, paramsArr[0]);

    }

    preCreate() {
        this.createView();
    }
    createView(): void {
    }

    addComponent(component) {
        super.addComponent(component);
        this.addView(component);

    }
    addView(component) {
        if (component instanceof View)
            this._view.addChild(component._view);
    }

}
