import { DisplayObject } from '../Primitive/DisplayObject';
import { IView } from './IView';
import { Component } from './Component';
import { AutoLayoutAdapter } from '../../Adapter/AutolayoutAdapter';
export class View extends Component implements IView {
    $view;
    _x;
    _y;
    _width;
    _height;
    _vfl;
    _autolayout;
    readonly config: Object;
    constructor({owner, name, componentList, config, vfl = [""]}) {
        super({ owner, name, componentList });
        this.config = config;
        this._vfl = vfl;
    }

    get $x() {
        return this._x;
    }
    set $x(value) {
        this.$view.position.x = value;
        this._x = value;
    }

    get $y() {
        return this._y;
    }
    set $y(value) {
        this.$view.position.y = value;
        this._y = value;
    }

    get $width() {
        return this._width;
    }
    set $width(value) {
        this.$view.width = value;
        this._width = value;
    }

    get $height() {
        return this._height;
    }
    set $height(value) {
        this.$view.height = value;
        this._height = value;
    }

    postCreateComponents() {
        super.postCreateComponents();

        this.renderLayout();
    }

    renderLayout() {
        this._autolayout = AutoLayoutAdapter.getInstance().parse(this._vfl);
        for (const key in this._autolayout.subViews) {
            const component = this.components[key];
            if (component) {
                const subView = this._autolayout.subViews[key];
                component.$x = subView.left;
                component.$y = subView.top;
                component.$width = subView.width;
                component.$height = subView.height;
            }
        }
    }


    createComponent(comp): Component {
        return new comp["family"]({
            owner: this,
            name: comp.name,
            componentList: comp.componentList,
            config: comp.config,
            vfl: comp.vfl
        });
    }

    addComponent(component) {
        super.addComponent(component);
        if (component instanceof View)
            this.addView(component);

    }
    addView(view: View) {
        this.$view.addChild(view.$view);
    }
}

